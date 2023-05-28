import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "~/db/db";
import type { UserType } from "~/db/zod";

export const useUser = routeLoader$(async (request) => {
  const userId = request.cookie.get("userId");
  if (!userId || isNaN(Number(userId.value))) {
    console.log("No cookie", userId);
    throw request.redirect(302, "/");
  }
  return (await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", Number(userId.value))
    .executeTakeFirst()) as UserType;
});

export default component$(() => {
  const user = useUser();

  return (
    <main class="py-20 mx-auto max-w-3xl">
      <h2 class="text-5xl font-bold">Tus proyectos</h2>
      <p class="py-2">{user.value.email}</p>
    </main>
  );
});
