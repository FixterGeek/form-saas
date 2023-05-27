import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="max-w-3xl mx-auto py-20 px-4">
      <h1 class="text-5xl font-bold">
        <span class="text-3xl">¡Solo copia, pega y listo!.</span>
        <br />
        Tu propio formulario de contacto sin configuración.
      </h1>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Getting started with Qwik by: Blissmo",
  meta: [
    {
      name: "description",
      content: "Form saas",
    },
  ],
};
