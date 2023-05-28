import {
  server$,
  // type RequestEvent,
  // type RequestHandler,
  // routeLoader$,
  type RequestEventLoader,
  type RequestHandler,
  type RequestEvent,
  useNavigate,
} from "@builder.io/qwik-city";
import { db } from "~/db/db";
// import invariant from "tiny-invariant";
import type { UserType } from "~/db/zod";
// import { component$ } from "@builder.io/qwik";
import invariant from "tiny-invariant";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import axios from "axios";

type UserDataType = {
  email: string;
  picture: string;
};

const googleTokensURL = "https://oauth2.googleapis.com/token?";

const getToken = server$(
  async (
    code: string,
    request:
      | RequestEventLoader<QwikCityPlatform>
      | RequestEvent<QwikCityPlatform>
  ) => {
    const url =
      googleTokensURL +
      new URLSearchParams({
        code,
        client_id: request.env.get("GOOGLE_CLIENT_ID") as string,
        client_secret: request.env.get("GOOGLE_SECRET") as string,
        redirect_uri:
          request.env.get("ENV") === "development"
            ? "http://localhost:5173/google/callback"
            : "https://form-saas.pages.dev/google/callback",
        grant_type: "authorization_code",
      });

    const resp: Response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    // const resp = await axios.post(
    //   url,
    //   {},
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    console.log("RESPIO", resp);
    return await resp.json();
  }
);

const getOrCreateUserFromGoogle = server$(
  async ({ token_type, access_token }) => {
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `${token_type} ${access_token}`,
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
        .execute();
    } else {
      // insert
      await db.insertInto("User").values(newUserData).execute();
    }
    return await db
      .selectFrom("User")
      .selectAll()
      .where("email", "=", newUserData.email)
      .executeTakeFirst();
  }
);

// const createSession = server$(
//   async ({
//     access_token,
//     request,
//     // redirectURL = "/",
//     token_type,
//   }: {
//     token_type: string | null;
//     access_token: string;
//     request: RequestEvent<QwikCityPlatform>;
//     redirectURL?: string;
//   }) => {
//     const user = (await getOrCreateUserFromGoogle({
//       access_token,
//       token_type,
//     })) as UserType;
//     console.log("user: ", user);
//     if (!user) {
//       console.log("no user", user);
//       throw request.redirect(303, "/");
//     }
//     // // set cookie
//     invariant(user.id);
//     await request.cookie.set("userId", user.id, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     // await new Promise((r) => setTimeout(() => r(null), 5000));
//     return;
//   }
// );

// export const onGet: RequestHandler = async (requestEvent) => {

//   // requestEvent.headers.set("Set-Cookie", `userId=${user.id}`);
//   // throw requestEvent.redirect(302, "/dash");
// };

export const onGet: RequestHandler = async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return;
  const { access_token, token_type } = await getToken(code, request);
  // if (!access_token) throw request.redirect(303, "/");
  const user = await getOrCreateUserFromGoogle({ access_token, token_type });
  invariant(user && user.id);
  request.cookie.set("userId", String(user.id), {
    maxAge: [30, "days"],
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });
  // throw request.redirect(302, "/dash");
  // throw request.redirect(302, "/dash");
  // console.log("Loader");
  // return;
  // @TODO: signout
};

export default component$(() => {
  const nav = useNavigate();
  useVisibleTask$(() => {
    nav("/dash");
  });
  return null;
});
// const url =
//   googleTokensURL +
//   new URLSearchParams({
//     code,
//     client_id: requestEvent.env.get("GOOGLE_CLIENT_ID") as string,
//     client_secret: requestEvent.env.get("GOOGLE_SECRET") as string,
//     redirect_uri:
//       requestEvent.env.get("ENV") === "development"
//         ? "http://localhost:5173/google/callback"
//         : "https://form-saas.pages.dev/google/callback",
//     grant_type: "authorization_code",
//   });

// const resp: Response = await fetch(url, {
//   method: "post",
//   headers: { Accept: "application/json" },
// });
// // create user, set cookie and redirect to dash
// const body = await resp.json();

// throw requestEvent.redirect(302, "/dash");
// requestEvent.json(200, {
//   status: resp.status,
//   statusText: resp.statusText,
//   message: await resp.json(),
// });
