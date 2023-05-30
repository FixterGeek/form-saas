import {
  server$,
  type RequestEventLoader,
  type RequestHandler,
  type RequestEvent,
  useNavigate,
} from "@builder.io/qwik-city";

import type { UserType } from "~/db/zod";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { PrismaClient } from "@prisma/client/edge";
import { getDB } from "~/db/db";

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
    });
    return await resp.json();
  }
);

const getNewUserData = server$(
  async ({ token_type, access_token }): Promise<UserType> => {
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

    return {
      name: null,
      email: data.email,
      picture: data.picture,
      access_token,
      provider: "google",
    };
  }
);

const createPrismaUser = server$(
  async (data: UserType, prisma: PrismaClient): Promise<UserType> => {
    return (await prisma.user.upsert({
      where: { email: data.email },
      create: data,
      update: data,
    })) as UserType;
  }
);

export const onGet: RequestHandler = async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return;
  const { access_token, token_type } = await getToken(code, request);
  const data = await getNewUserData({ access_token, token_type });
  const user = await createPrismaUser(data, getDB(request.env));

  request.cookie.set("userId", String(user.id), {
    maxAge: [30, "days"],
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });
  // @TODO: signout
};

export default component$(() => {
  const nav = useNavigate();
  useVisibleTask$(() => {
    nav("/dash");
  });
  return null;
});
