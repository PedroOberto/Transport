<template>
  <div class="search">
    <img class="airplane" src="@/assets/airplane.svg" alt="Avião" />
    <h1>Soluções para envio de suas encomendas do exterior</h1>
    <SearchForm />
    <div class="city"></div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
export default {
  name: "Search",
  components: {
    SearchForm
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: white;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  padding: 10px;
  @media screen and (min-width: 768px) {
    top: 35%;
  }
}
.search {
  z-index: 0;
  position: relative;
  height: 100vh;
  background: url("../../src/assets/cloud.png") repeat-x top #65ba82;
  animation: cloud 40s linear infinite;
  box-shadow: 0 3px 3px #65ba82;
}
@keyframes cloud {
  0% {
    background-position: 100vw 0;
  }
  100% {
    background-position: 0vw 0;
  }
}
.airplane {
  width: 120px;
  margin: 0 auto;
  position: absolute;
  top: 130px;
  left: 0;
  right: 0;
  z-index: 0;
  animation: airplane 1s cubic-bezier(1, 1, 1, 1) infinite alternate;
}
@keyframes airplane {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
.city {
  background: url("../../src/assets/city.png") repeat-x bottom;
  min-height: 200px;
  background-size: 420px;
  animation: city 20s linear infinite;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
@keyframes city {
  0% {
    background-position: 100vw;
  }
  100% {
    background-position: 0vw;
  }
}

form {
  width: 70%;
  position: absolute;
  left: 0;
  right: 0;
  top: 60%;
}
</style>