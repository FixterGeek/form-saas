import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { routeAction$, type RequestEventAction } from "@builder.io/qwik-city";

const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?";

export const useGoogleOAuth2 = routeAction$(
  async (_, requestEvent: RequestEventAction<QwikCityPlatform>) => {
    console.log("Server actions");
    const url =
      googleURL +
      new URLSearchParams({
        client_id: requestEvent.env.get("GOOGLE_CLIENT_ID") as string,
        redirect_uri:
          requestEvent.env.get("ENV") === "development"
            ? "http://localhost:5173/google/callback"
            : "https://form-saas.pages.dev/google/callback",
        response_type: "code",
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        access_type: "offline",
      });
    throw requestEvent.redirect(302, url);
  }
);

export default component$(() => {
  const theme = useSignal<"dark" | "light">("dark");

  const onChangeTheme = $((event: Event) => {
    theme.value = (event.target as HTMLInputElement).checked ? "dark" : "light";
  });

  return (
    <>
      <Nav theme={theme.value} onChangeTheme={onChangeTheme} />
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
    theme,
    onChangeTheme,
  }: {
    onChangeTheme: any;
    theme: "dark" | "light";
  }) => {
    const action = useGoogleOAuth2();

    return (
      <nav class="bg-white flex justify-between px-12 py-4 items-center h-20 rounded-full shadow-md my-4 fixed w-full top-0">
        <h2 class="font-bold uppercase">Forms</h2>
        <div class="flex items-center gap-4">
          <button
            onClick$={async () => {
              const { value } = await action.submit({ perro: "blissmo" });
              console.log(value);
            }}
            class="hover:font-bold font-medium"
          >
            {action.isRunning ? (
              <progress class="progress w-12"></progress>
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
