<template>
  <footer>
    <span>© 2019 Transport – Alguns direitos reservados.</span>
    <a href="https://pedrooberto.com.br/" target="_blank">
      <img
        class="pedrooberto_footer"
        src="@/assets/pedrooberto_footer.png"
        alt="Desenvolvido por Pedro Oberto"
        title="Desenvolvido por Pedro Oberto"
      />
    </a>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>

<style lang="scss">
footer {
  background-color: #49875e;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  span {
    display: block;
    text-align: center;
    color: white;
  }
  .pedrooberto_footer {
    width: 40px;
  }
}
</style>