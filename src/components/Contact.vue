<template>
  <section class="container">
    <h2>Contato</h2>
    <form class="contact grid-8">
      <label for="name">Nome</label>
      <input type="text" name="name" id="name" />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <label for="phone">Telefone</label>
      <input type="text" name="phone" id="phone" />
      <label for="message">Mensagem</label>
      <textarea name="message" id="message" cols="30" rows="10"></textarea>
    </form>
    <div class="grid-8 social">
      <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="../assets/facebook.png" />
        <span>Transport</span>
      </a>
      <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="../assets/twitter.png" />
        <span>@Transport</span>
      </a>
      <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="../assets/instagram.png" />
        <span>@Transport</span>
      </a>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  background: url("../../src/assets/bg-box.png") no-repeat bottom right;
  background-size: 60%;
}
.social {
  margin-top: 15px;
  a {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      margin: 10px;
    }
  }
}
</style>