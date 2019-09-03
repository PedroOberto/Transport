<template>
  <section>
    <img src="@/assets/notfound.png" alt="Pagina Não Encontrada" />
    <h1>Pagina Não Encontrada 404</h1>
    <router-link to="/" class="button">Transport</router-link>
  </section>
</template>

<script>
export default {
  name: "NotFoundComponent",
  created() {
    document.title = "Pagina Não Encontrada 404";
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 250px;
  margin: 100px auto 0;
}
</style>