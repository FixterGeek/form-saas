import {
  server$,
  type RequestEvent,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { db } from "~/db/db";
import invariant from "tiny-invariant";
import type { UserType } from "~/db/zod";

type UserDataType = {
  email: string;
  picture: string;
};

const googleTokensURL = "https://oauth2.googleapis.com/token?";

const getOrCreateUserFromGoogle = server$(
  async ({ token_type, access_token, refresh_token }) => {
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `${token_type} ` + access_token,
      },
      method: "get",
    };
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    const resp = await fetch(url, options);
    const data: UserDataType = await resp.json();
    const newUserData: UserType = {
      name: null,
      email: data.email,
      picture: data.picture,
      access_token,
      refresh_token,
      provider: "google",
    };

    // check if exists
    const exists = await db
      .selectFrom("User")
      .selectAll()
      .where("email", "=", newUserData.email)
      .executeTakeFirst();
    if (exists) {
      // update
      await db
        .updateTable("User")
        .set(newUserData)
        .where("id", "=", exists.id)
        // .returningAll()
        .executeTakeFirst();
    } else {
      // insert
      await db.insertInto("User").values(newUserData).executeTakeFirst();
    }
    return await db
      .selectFrom("User")
      .selectAll()
      .where("email", "=", newUserData.email)
      .executeTakeFirst();
  }
);

const createSession = server$(
  async ({
    access_token,
    request,
    // redirectURL = "/",
    token_type,
    refresh_token,
  }: {
    refresh_token: string;
    token_type: string;
    access_token: string;
    request: RequestEvent<QwikCityPlatform>;
    redirectURL?: string;
  }) => {
    const user = (await getOrCreateUserFromGoogle({
      access_token,
      token_type,
      refresh_token,
    })) as UserType;
    if (!user) {
      throw request.redirect(303, "/");
    }
    // // set cookie
    invariant(user.id);
    await request.cookie.set("userId", user.id, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });
    // await new Promise((r) => setTimeout(() => r(null), 5000));
    return;
  }
);

export const onGet: RequestHandler = async (requestEvent) => {
  const searchParams = new URL(requestEvent.url).searchParams;
  const code = searchParams.get("code");
  if (!code) throw requestEvent.redirect(303, "/");
  const url =
    googleTokensURL +
    new URLSearchParams({
      code,
      client_id: requestEvent.env.get("GOOGLE_CLIENT_ID") as string,
      client_secret: requestEvent.env.get("GOOGLE_SECRET") as string,
      redirect_uri:
        requestEvent.env.get("ENV") === "development"
          ? "http://localhost:5173/google/callback"
          : "https://form-saas.pages.dev/google/callback",
      grant_type: "authorization_code",
    });

  const resp: Response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  // create user, set cookie and redirect to dash
  const body = await resp.json();

  await createSession({
    request: requestEvent,
    access_token: body.access_token,
    refresh_token: body.refresh_token,
    token_type: body.token_type,
    redirectURL: "/dash",
  });
  throw requestEvent.redirect(302, "/dash");
  // requestEvent.json(200, {
  //   status: resp.status,
  //   statusText: resp.statusText,
  //   message: await resp.json(),
  // });
};
