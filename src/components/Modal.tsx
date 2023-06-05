import { Slot, component$ } from "@builder.io/qwik";

interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}
export default component$<ModalProps>(function Modal({ isOpen, id, onClose }) {
  return (
    <>
      <dialog open={isOpen} id={id} class=" rounded-xl ">
        <div class="p-4">
          <Slot />
        </div>
        <button class="absolute top-0 right-0 my-2 mx-4" onClick$={onClose}>
          &#10005;
        </button>
      </dialog>
    </>
  );
});
