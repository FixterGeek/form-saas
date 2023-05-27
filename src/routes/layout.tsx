import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import {
  routeAction$,
  type RequestEventAction,
  routeLoader$,
} from "@builder.io/qwik-city";
import db, { type UserType } from "~/db/db";

const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?";

export const useGoogleOAuth2 = routeAction$(
  async (_, requestEvent: RequestEventAction<QwikCityPlatform>) => {
    // check for logged user
    if (requestEvent.cookie.has("userId")) {
      throw requestEvent.redirect(301, "/dash");
    }

    const url =
      googleURL +
      new URLSearchParams({
        client_id: requestEvent.env.get("GOOGLE_CLIENT_ID") as string,
        redirect_uri:
          requestEvent.env.get("ENV") === "development"
            ? "http://localhost:5173/google/callback"
            : "https://form-saas.pages.dev/google/callback",
        response_type: "code",
        scope: "https://www.googleapis.com/auth/userinfo.email",
        access_type: "offline",
      });
    throw requestEvent.redirect(302, url);
  }
);

export const useUser = routeLoader$(async (request) => {
  if (request.cookie.has("userId")) {
    const userId = request.cookie.get("userId");
    const user = await db.user.findUnique({
      where: {
        id: Number(userId.value) || 0,
      },
    });
    return user;
  }
});

export default component$(() => {
  const theme = useSignal<"dark" | "light">("dark");
  const { value: user } = useUser();

  const onChangeTheme = $((event: Event) => {
    theme.value = (event.target as HTMLInputElement).checked ? "dark" : "light";
  });

  return (
    <>
      <Nav user={user} theme={theme.value} onChangeTheme={onChangeTheme} />
      <main class={`${theme.value}`}>
        <section class="bg-slate-500 dark:bg-slate-900 dark:text-slate-400 py-20 min-h-screen">
          <Slot />
        </section>
      </main>
    </>
  );
});

const Nav = component$(
  ({
    user,
    theme,
    onChangeTheme,
  }: {
    user?: UserType;
    onChangeTheme: any;
    theme: "dark" | "light";
  }) => {
    const action = useGoogleOAuth2();

    return (
      <nav class="bg-white flex justify-between px-12 py-4 items-center h-20 rounded-full shadow-md my-4 fixed w-full top-0">
        <h2 class="font-bold uppercase">Forms</h2>
        <div class="flex items-center gap-4">
          {/* Need to redirecto to dash */}
          <button
            onClick$={async () => {
              if (user) {
                console.log("redirect @TODO");
              } else {
                await action.submit({ perro: "blissmo" });
              }
            }}
            class="font-bold"
          >
            {action.isRunning ? (
              <progress class="progress w-12"></progress>
            ) : user ? (
              user.email
            ) : (
              "Login"
            )}
          </button>
          <label for="theme text-xs">{theme}</label>
          <input
            onChange$={onChangeTheme}
            id="theme"
            type="checkbox"
            class="toggle"
            checked
          />
        </div>
      </nav>
    );
  }
);
