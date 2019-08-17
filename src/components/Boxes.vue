<template>
  <section id="boxes" class="container section boxes">
    <h2>Escolha uma de nossas caixas</h2>
    <h3>Muito mais fácil enviar os seus bens para o Brasil, sem limite de peso.</h3>
    <div class="grid-1-3 box">
      <span>Box S</span>
      <img src="@/assets/box.png" alt="Caixas" />
      <p>C 65 cm | A 42 cm | L 56 cm</p>
    </div>
    <div class="grid-1-3 box">
      <span>Box M</span>
      <img src="@/assets/box.png" alt="Caixas" />
      <p>C 78 cm | A 51 cm | L 56 cm</p>
    </div>
    <div class="grid-1-3 box">
      <span>Box L</span>
      <img src="@/assets/box.png" alt="Caixas" />
      <p>C 78 cm | A 60 cm | L 56 cm</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Boxes"
};
</script>

<style lang="scss">
.boxes {
  .box {
    padding: 20px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    img {
      max-width: 200px;
      margin: 0 auto;
    }
    span {
      color: #87693b;
      font-size: 24px;
    }
    p {
      color: #313b34;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>