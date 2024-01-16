<template>
  <section class="flex flex-col items-center mt-20">
    <h1 class="text-9xl font-bold">404</h1>
    <span class="text-lg text-gray-400 mt-4">Whooops... This page could not be found!</span>

    <RouterLink :to="{name: 'home'}" class="border border-current border-solid rounded-lg mt-8 px-4 py-2 opacity-75 font-bold hover:opacity-90">
      Take me home
    </RouterLink>
  </section>
</template>