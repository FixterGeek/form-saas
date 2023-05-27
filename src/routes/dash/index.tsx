import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async (request) => {
  const userId = request.cookie.get("userId");
  if (!userId) {
    throw request.redirect(302, "/");
  }
};

export default component$(() => {
  return (
    <main class="py-20 mx-auto max-w-3xl">
      <h2 class="text-5xl font-bold">Dashboard</h2>
    </main>
  );
});
