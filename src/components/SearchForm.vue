<template>
  <form>
    <input
      type="text"
      id="code"
      name="code"
      v-model="code"
      :class="{active: this.$store.state.loading_tracking}"
      placeholder="Digite um código"
    />
    <input type="submit" id="search" name="search" value="Buscar" @click.prevent="searchCode" />

    <div v-if="searchEmpty" class="modal_error">
      <div class="modal_error_container">
        <button class="modal_error_fechar" @click="closeModal">X</button>
        <p>Digite um Código</p>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchForm",
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
        this.code = "";
      } else {
        this.searchEmpty = true;
        this.code = "";
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
#code {
  width: 100%;
  padding: 20px;
}
.active {
  background: linear-gradient(to right, #fff 0%, #65ba82 100%);
  animation: rotate 3s infinite linear;
}
@keyframes rotate {
  from {
    background-position: -1000px;
  }
  to {
    background-position: 0px;
  }
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