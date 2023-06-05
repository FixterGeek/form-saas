import { $, component$, useSignal } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { PrismaClient } from "@prisma/client/edge";
import { getDB } from "~/db/db";
import { LuClipboardType, LuMapPinOff } from "@qwikest/icons/lucide";
import Modal from "~/components/Modal";

declare const newModal: { close: () => void; showModal: () => void };

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
  const showModal = useSignal(true);

  const onClose = $(() => {
    newModal.close();
    showModal.value = false;
  });

  return (
    <main class="py-4 mx-auto max-w-3xl">
      <div>
        <h2 class="text-5xl font-bold">Tus proyectos</h2>
        <p class="py-2">{user?.value?.email}</p>
      </div>
      <section class="py-8 flex justify-between items-center border-t-slate-800 border-t mt-2">
        <input
          class="py-1 px-4 rounded-md min-w-[260px] text-sm font-thin"
          placeholder="Busca un proyecto"
        />
        <button
          onClick$={() => {
            newModal.showModal();
            showModal.value = true;
          }}
          class="py-2 px-4 dark:bg-white dark:text-black rounded-md text-xs font-bold hover:ring-slate-500 hover:ring-3 text-white bg-black"
        >
          Nuevo proyecto +
        </button>
      </section>
      <section>
        <ProyectCard />
        <Modal id="newModal" isOpen={showModal.value} onClose={onClose}>
          <form class="grid">
            <h2 class="text-xl pb-6 pt-2">Agrega un proyecto nuevo</h2>
            <input
              type="text"
              class="input mb-4"
              placeholder="Nombre del proyecto"
            />
            <button type="submit" class="py-2 px-6 bg-slate-500 rounded-md">
              Crear
            </button>
          </form>
        </Modal>
      </section>
    </main>
  );
});

export const ProyectForm = () => {
  return <h2>El form</h2>;
};

export const ProyectCard = component$(({ id }: { id?: string }) => {
  return (
    <Link href={`${id || "blissmo"}`}>
      <div class="rounded-md border border-slate-700 inline-block p-4 hover:shadow-2xl shadow-black transition-all cursor-pointer hover:ring">
        <h2 class="text-lg dark:text-white">Fixtergeek.com</h2>
        <div class="flex text-xs py-4 gap-6">
          <p class="flex items-center gap-2">
            <span class="text-blue-400">
              <LuClipboardType />
            </span>
            <span>3 Formularios</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="text-blue-400">
              <LuMapPinOff />
            </span>
            <span>3 Incompletos</span>
          </p>
        </div>
        <p class="text-xs">Ultima actualización hace 8 días</p>
      </div>
    </Link>
  );
});
