import { $, component$, Slot, useSignal } from "@builder.io/qwik";

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

const Nav = ({
  theme,
  onChangeTheme,
}: {
  onChangeTheme: any;
  theme: "dark" | "light";
}) => {
  return (
    <nav class="bg-white flex justify-between px-12 py-4 items-center h-20 rounded-full shadow-md my-4 fixed w-full top-0">
      <h2 class="font-bold uppercase">Forms</h2>
      <div class="flex items-center gap-4">
        <button class="hover:font-bold font-medium">Login</button>
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
};
