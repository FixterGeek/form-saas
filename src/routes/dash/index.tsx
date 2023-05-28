import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client/edge";

export const useUser = routeLoader$(async (request) => {
  const userId = request.cookie.get("userId");
  if (!userId?.value) {
    throw request.redirect(302, "/");
  }
  const db = new PrismaClient({
    datasources: {
      db: {
        url: request.env.get("DATABASE_URL"),
      },
    },
  });
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
