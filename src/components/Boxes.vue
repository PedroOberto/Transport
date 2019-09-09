<template>
  <section id="boxes" class="container section boxes">
    <h2>Escolha uma de nossas caixas</h2>
    <h3>Muito mais fácil enviar os seus bens para o Brasil, sem limite de peso.</h3>
    <div class="grid-1-3 box">
      <h4>Box S</h4>
      <img src="@/assets/box.png" alt="Caixas" />
      <div>
        <p>
          Comprimento:
          <span>65 cm</span>
        </p>
        <p>
          Altura:
          <span>42 cm</span>
        </p>
        <p>
          Largura:
          <span>56 cm</span>
        </p>
      </div>
    </div>
    <div class="grid-1-3 box">
      <h4>Box M</h4>
      <img src="@/assets/box.png" alt="Caixas" />
      <div>
        <p>
          Comprimento:
          <span>65 cm</span>
        </p>
        <p>
          Altura:
          <span>42 cm</span>
        </p>
        <p>
          Largura:
          <span>56 cm</span>
        </p>
      </div>
    </div>
    <div class="grid-1-3 box">
      <h4>Box L</h4>
      <img src="@/assets/box.png" alt="Caixas" />
      <div>
        <p>
          Comprimento:
          <span>65 cm</span>
        </p>
        <p>
          Altura:
          <span>42 cm</span>
        </p>
        <p>
          Largura:
          <span>56 cm</span>
        </p>
      </div>
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
    text-align: center;
    transition: all 0.3s;
    background: #ffffffa1;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    border: 1px solid #e9e9e9;
    cursor: pointer;
    img {
      max-width: 200px;
      margin: 0 auto 20px;
    }
    div {
      p {
        color: #313b34;
        span {
          color: #87693b;
        }
      }
      margin-bottom: 20px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>