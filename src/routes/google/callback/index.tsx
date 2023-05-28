import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import db from "~/db/db";
import { type UserType } from "~/db/zod";

const googleTokensURL = "https://oauth2.googleapis.com/token?";

type UserDataType = {
  id: string;
  email: string;
  verified_email: boolean;
  picture: string;
};

const createSessionAndRedirect = async ({
  access_token,
  request,
  redirectURL = "/",
  refresh_token,
  token_type,
}: {
  refresh_token: string;
  token_type: string;
  access_token: string;
  request: RequestEvent<QwikCityPlatform>;
  redirectURL: string;
}) => {
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
  const user = await upsertUser({
    email: data.email,
    picture: data.picture,
    access_token,
    refresh_token,
    provider: "google",
  });
  // set cookie
  await request.cookie.set("userId", user.id, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });
  throw request.redirect(303, redirectURL);
  // request.json(200, user);
};

const upsertUser = async (newUserData: UserType) => {
  return await db.user.upsert({
    where: {
      id: newUserData.id,
      email: newUserData.email,
    },
    update: {
      name: newUserData.name,
      email: newUserData.email,
      picture: newUserData.picture,
      access_token: newUserData.access_token,
      refresh_token: newUserData.refresh_token,
    },
    create: {
      name: newUserData.name,
      email: newUserData.email,
      picture: newUserData.picture,
      access_token: newUserData.access_token,
      refresh_token: newUserData.refresh_token,
    },
  });
};

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
  console.log(body);
  return createSessionAndRedirect({
    request: requestEvent,
    access_token: body.access_token,
    refresh_token: body.refresh_token,
    token_type: body.token_type,
    redirectURL: "/",
  });
  // requestEvent.json(200, {
  //   status: resp.status,
  //   statusText: resp.statusText,
  //   message: await resp.json(),
  // });
};
