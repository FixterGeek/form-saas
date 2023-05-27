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
    <main class={`${theme.value}`}>
      <Nav user={user} theme={theme.value} onChangeTheme={onChangeTheme} />
      <section>
        <section class="bg-[white] dark:bg-[#0F1017] dark:text-slate-400 py-20 min-h-screen text-[#121826]">
          <Slot />
        </section>
      </section>
      <Footer />
    </main>
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

const Footer = () => {
  return (
    <div class=" bg-[#0F1017] dark:bg-[white] ">
      <div class="max-w-6xl  mx-auto py-8">
        <div class=" flex justify-between ">
          <p>logo</p>
          <div class="flex gap-8 font-light">
            <p>Planes</p>
            <p>Preguntas frecuentes</p>
            <p>Contacto</p>
          </div>
          <div class="flex gap-2">
            <p>f</p>
            <p>t</p>
            <p>yt</p>
          </div>
        </div>
        <hr class="my-6 bg-[#2E2E2E] dark:bg-[#2E2E2E] h-[1px] border-none" />
        <div class="flex justify-center gap-8 font-light opacity-[.5]">
          <p>© 2023 Formy Reserved</p>
          <p>Política de privacidad</p>
          <p>Términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};
