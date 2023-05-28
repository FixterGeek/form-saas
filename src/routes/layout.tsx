import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { routeAction$, type RequestEventAction } from "@builder.io/qwik-city";
import type { UserType } from "~/db/zod";

const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?";

export const useGoogleCode = routeAction$(
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

// export const useUser = routeLoader$(async (request: RequestEventLoader) => {
//   if (request.cookie.has("userId")) {
//     const userId = request.cookie.get("userId");
//     if (!userId) return null;
//     const user = (await db
//       .selectFrom("User")
//       .selectAll()
//       .where("id", "=", Number(userId.value))
//       .executeTakeFirst()) as UserType;
//     if (!user) {
//       // request.cookie.delete("userId");
//     }
//     return user;
//   }
// });

export default component$(() => {
  const theme = useSignal<"dark" | "light">("dark");
  // const user = useUser();

  const onChangeTheme = $((event: Event) => {
    theme.value = (event.target as HTMLInputElement).checked ? "dark" : "light";
  });

  return (
    <main class={`${theme.value}`}>
      <Nav
        // user={user.value}
        theme={theme.value}
        onChangeTheme={onChangeTheme}
      />
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
    user?: UserType | null | undefined;
    onChangeTheme: any;
    theme: "dark" | "light";
  }) => {
    const action = useGoogleCode();
    // const { value: user } = useUser();
    return (
      <nav class="bg-white dark:bg-[#0F1017] flex justify-between px-12 py-4 items-center h-20  fixed w-full top-0 z-20">
        <h2 class="font-bold uppercase">Forms</h2>
        <div class="flex items-center gap-4">
          {/* Need to redirecto to dash */}
          <button
            // onClick$={async () => {
            // getToken();
            // }}
            onClick$={() => action.submit()}
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
    <div class=" bg-white dark:bg-[#0F1017] ">
      <div class="max-w-6xl  mx-auto py-8">
        <div class=" flex justify-between text-[#0F1017] dark:text-[#e5e7eb] ">
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
        <hr class="my-6 bg-[#E1E0E0] dark:bg-[#2E2E2E] h-[1px] border-none" />
        <div class="flex justify-center gap-8 font-light opacity-[.5] text-[#7A8495] dark:text-[#A1A8BB]">
          <p>© 2023 Formy Reserved</p>
          <p>Política de privacidad</p>
          <p>Términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};
