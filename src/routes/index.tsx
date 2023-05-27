import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "../../styles/app.css";

const form = "https://i.imgur.com/SWfEgJN.png"
const icon = "https://i.imgur.com/zxeiNqq.png"
export default component$(() => {
  return (
    <main class="max-w-6xl mx-auto py-20 px-4">
      <section class='h-[80vh]'>
        <h1 class="text-5xl font-bold">
          <span class="text-3xl">¡Solo copia, pega y listo!.</span>
          <br />
          Tu propio formulario de contacto sin configuración. <br />
          HTML y nada más.
        </h1>
      </section>
      <section class='text-center py-28'>
        <h2 class="dark:text-[#E7E8EC] text-[#0F1017] text-4xl md:text-5xl mb-6"><span class='font-bold'>Elige tu</span> favorito</h2>
        <p class="dark:text-[#7D7D84] text-[#7D7D84] text-xl md:text-2xl font-light">Lorem ipsum dolor sit amet consectetur. Velit nisi congue diam nibh duis. Et quis posuere eu urna tortor. Felis eget eu amet amet a. Ullamcorper odio nibh egestas mi. Quis in eros imperdiet enim sed laoreet tincidunt. Id dictumst arcu.</p>
        <div class='flex flex-wrap justify-center gap-20 mt-16'>
          <div class='w-full lg:w-[500px] text-left' >
            <img class='object-cover h-[360px] w-full rounded-md mb-6' src={form} />
            <h3 class='text-xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>Formularios de contacto</h3>
            <p class='text-lg font-light text-[#4B5563] dark:text-[#7D7D84]'>Trabajamos en el diseño y configuración de tu encuesta para optimizar la obtención de resultados. </p>
          </div>
          <div class='w-full lg:w-[500px] text-left' >
            <img class='object-cover h-[360px] w-full rounded-md mb-6' src={form} />
            <h3 class='text-xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>Sucriptores</h3>
            <p class='text-lg font-light text-[#4B5563] dark:text-[#7D7D84]'>Trabajamos en el diseño y configuración de tu encuesta para optimizar la obtención de resultados. </p>
          </div>
        </div>
      </section>
      <section class='text-center py-28'>
        <h2 class="color-red text-4xl md:text-5xl mb-6 dark:text-[#e5e7eb] text-[#0F1017]">Crea tu form <span class='font-bold'>en 3 clics</span> </h2>
        <p class=" text-xl md:text-2xl font-light  text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet consectetur. Velit nisi congue diam nibh duis. Et quis posuere eu urna tortor. Felis eget eu amet amet a. Ullamcorper odio nibh egestas mi. Quis in eros imperdiet enim sed laoreet tincidunt. Id dictumst arcu.</p>
        <div class='flex flex-wrap justify-center gap-20 mt-16'>
          <div class='flex flex-col gap-16 justify-center'>
            <div class='flex items-center gap-4'>
              <span class='bg-black dark:bg-[#e5e7eb] w-8 h-8 rounded-full pt-1 text-white dark:text-[#0F1017]'>1</span>
              <div class='text-left'>
                <h3 class='text-base dark:text-[#e5e7eb] text-[#0F1017]'>Crea tu proyecto</h3>
                <p class='text-base font-light  text-[#4B5563] dark:text-[#7D7D84]'>Selecciona el tipo de datos que quieres</p>
              </div>
            </div>
            <div class='flex items-center gap-4'>
              <span class='bg-black dark:bg-[#e5e7eb] w-8 h-8 rounded-full pt-1 text-white dark:text-[#0F1017]'>2</span>
              <div class='text-left'>
                <h3 class='text-base dark:text-[#e5e7eb] text-[#0F1017]'>Crea tu proyecto</h3>
                <p class='text-base font-light  text-[#4B5563] dark:text-[#7D7D84]'>Selecciona el tipo de datos que quieres</p>
              </div>
            </div>
            <div class='flex items-center gap-4'>
              <span class='bg-black dark:bg-[#e5e7eb] w-8 h-8 rounded-full pt-1 text-white dark:text-[#0F1017]'>3</span>
              <div class='text-left'>
                <h3 class='text-base dark:text-[#e5e7eb] text-[#0F1017]'>Crea tu proyecto</h3>
                <p class='text-base font-light  text-[#4B5563] dark:text-[#7D7D84]'>Selecciona el tipo de datos que quieres</p>
              </div>
            </div>
          </div>
          <div class='w-full lg:w-[600px] text-left ' >
            <img class='object-cover w-full h-[440px] rounded-md' src={form} />
          </div>
        </div>
      </section >
      <section class='text-center py-28'>
        <h2 class="color-red text-4xl md:text-5xl mb-6 dark:text-[#e5e7eb] text-[#0F1017]">Escoge <span class='font-bold'>tu plan</span> </h2>
        <p class=" text-xl md:text-2xl font-light  text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet consectetur. Velit nisi congue diam nibh duis. Et quis posuere eu urna tortor. Felis eget eu amet amet a. Ullamcorper odio nibh egestas mi. Quis in eros imperdiet enim sed laoreet tincidunt. Id dictumst arcu.</p>
        <div class="tabs bg-[#EDEDF1] w-[240px] h-[56px] rounded-full mt-16 ">
          <a class="tab">Tab 1</a>
          <a class="tab activeLight ">Tab 2</a>
        </div>
        <div class="flex flex-wrap gap-20 justify-center mt-8">
          <div class="border-solid border-[1px] rounded-xl border-[#E1E0E0] dark:border-[#2E2E2E] w-[360px] py-[32px] px-6 text-left">
            <h3 class='text-2xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>Basic</h3>
            <p class='text-[#4B5563] dark:text-[#7D7D84] mb-4 font-light'>Lorem ipsum dolor sit amet consectetur. Risus ut feugiat.</p>
            <p> <span class='text-4xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>$9 </span><span class='text-lg '> USD / mes</span></p>
            <hr class="my-6 bg-[#EDEDF1] dark:bg-[#2E2E2E] h-[1px] border-none" />
            <div class='flex items-center gap-4 mb-6'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <div class='flex items-center gap-4 mb-6'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <div class='flex items-center gap-4'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <hr class="my-6 bg-[#EDEDF1] dark:bg-[#2E2E2E] h-[1px] border-none" />
            <button class='btn w-full'>¡Empezar!</button>
          </div>
          <div class="border-solid border-[1px] rounded-xl border-[#E1E0E0] dark:border-[#2E2E2E] w-[360px] py-[32px] px-6 text-left">
            <h3 class='text-2xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>PRO</h3>
            <p class='text-[#4B5563] dark:text-[#7D7D84] mb-4 font-light'>Lorem ipsum dolor sit amet consectetur. Risus ut feugiat.</p>
            <p> <span class='text-4xl font-bold dark:text-[#e5e7eb] text-[#0F1017]'>$15 </span><span class='text-lg '> USD / mes</span></p>
            <hr class="my-6 bg-[#EDEDF1] dark:bg-[#2E2E2E] h-[1px] border-none" />
            <div class='flex items-center gap-4 mb-6'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <div class='flex items-center gap-4 mb-6'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <div class='flex items-center gap-4'>
              <img class='h-10' src={icon} />
              <h4 class="text-[#4B5563] dark:text-[#7D7D84]">Lorem ipsum dolor sit amet conse</h4>
            </div>
            <hr class="my-6 bg-[#EDEDF1] dark:bg-[#2E2E2E] h-[1px] border-none" />
            <button class='btn w-full'>¡Empezar!</button>
          </div>
        </div>
      </section>
      <section class='text-center py-28'>
        <h2 class="color-red text-4xl md:text-5xl mb-6 dark:text-[#e5e7eb] text-[#0F1017]"> Haz llegado hasta aquí, así que estas muy interesad@ o tienes <span class='font-bold'> algunas preguntas</span></h2>
        <p class=" text-xl md:text-2xl font-light   text-[#4B5563] dark:text-[#7D7D84]">Cualquiera que sea el caso, te compartimos las preguntas más frecuentes para que termines de convencerte.</p>
        <div class="my-20 flex flex-col gap-6">
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
          <Question
            question="¿Cuál es el precio de un estudio?"
            response="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum "
          />
        </div>
      </section>
    </main >
  );
});


const Question = ({ question, response }) => {
  return (
    <div tabindex="0" class="collapse collapse-plus border border-[#E1E0E0] dark:border-[#2E2E2E] rounded-box text-left">
      <div class="collapse-title text-xl font-medium text-[#0F1017] dark:text-[#e5e7eb]">
        {question}
      </div>
      <div class="collapse-content  text-[#4B5563] dark:text-[#7D7D84]">
        <p>{response}</p>
      </div>
    </div>
  )
}

export const head: DocumentHead = {
  title: "Getting started with Qwik by: Blissmo",
  meta: [
    {
      name: "description",
      content: "Form saas",
    },
  ],
};
