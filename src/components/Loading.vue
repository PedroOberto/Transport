<template>
  <div>
    <img class="loading" src="@/assets/airplane.svg" alt="Avião" />
    <span>Carregando...</span>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style lang="scss" scoped>
div {
  position: relative;
}
.loading {
  width: 100px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  animation: airplane 1s cubic-bezier(1, 1, 1, 1) infinite alternate;
}
span {
  font-size: 24px;
  color: #65ba82;
  margin: 0 auto;
  position: relative;
  display: block;
  text-align: center;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 10;
}
@keyframes airplane {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>