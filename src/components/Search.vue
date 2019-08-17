<template>
  <div class="search">
    <img class="airplane" src="@/assets/airplane.svg" alt="Avião" />
    <form>
      <input
        type="text"
        id="code"
        name="code"
        v-model="code"
        placeholder="Digite o codico de rastreio"
      />
      <input type="submit" id="search" name="search" value="Buscar" @click.prevent="searchCode" />
    </form>
    <div class="city"></div>
    <div v-if="searchEmpty" class="modal_error">
      <div class="modal_error_container">
        <button class="modal_error_fechar" @click="closeModal">X</button>
        <p>Digite um Codigo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      code: "",
      searchEmpty: false
    };
  },
  methods: {
    searchCode() {
      if (this.code) {
        this.$router.push({ query: { q: this.code } });
        this.searchEmpty = false;
      } else {
        this.searchEmpty = true;
      }
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.searchEmpty = false;
      }
    }
  }
};
</script>

<style lang="scss">
.search {
  z-index: 0;
  position: relative;
  height: 100vh;
  background: url("../../src/assets/cloud.png") repeat-x top #65ba82;
  animation: cloud 40s linear infinite;
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
  width: 100px;
  margin: 0 auto;
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  z-index: 1;
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
  min-height: 150px;
  background-size: 300px;
  animation: city 20s linear infinite;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
@keyframes city {
  0% {
    background-position: 100vw;
  }
  100% {
    background-position: 0vw;
  }
}

#code {
  width: 100%;
  padding: 20px;
}
#search {
  width: 62px;
  height: 62px;
  background: url("../../src/assets/search.svg") no-repeat center center;
  border: none;
  text-indent: -150px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>