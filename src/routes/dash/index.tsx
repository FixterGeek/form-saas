import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { PrismaClient } from "@prisma/client/edge";
import { getDB } from "~/db/db";

export const useUser = routeLoader$(async (request) => {
  const userId = request.cookie.get("userId");
  if (!userId?.value) {
    throw request.redirect(302, "/");
  }
  const db: PrismaClient = getDB(request.env);
  return await db.user.findUnique({ where: { id: userId.value } });
});

export default component$(() => {
  const user = useUser();

  return (
    <main class="py-20 mx-auto max-w-3xl">
      <h2 class="text-5xl font-bold">Tus proyectos</h2>
      <p class="py-2">{user?.value?.email}</p>
    </main>
  );
});
