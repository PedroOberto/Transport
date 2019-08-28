<template>
  <section class="container section">
    <nav>
      <ul>
        <router-link class="button" :to="{name: 'user-info'}">Meus Dados</router-link>
        <router-link
          v-if="this.user.role === 'administrator'"
          class="button"
          :to="{name: 'add-box'}"
        >Adicionar Box</router-link>
        <router-link
          v-if="this.user.role === 'administrator'"
          class="button"
          :to="{name: 'user-box'}"
        >Caixas</router-link>
        <router-link
          v-if="this.user.role === 'subscriber'"
          class="button"
          :to="{name: 'user-box'}"
        >Minhas Caixas</router-link>
        <router-link class="button" :to="{name: 'login'}">Deslogar</router-link>
      </ul>
    </nav>
    <transition>
      <router-view :user="user"></router-view>
    </transition>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "User",
  computed: {
    ...mapState(["login", "user"])
  }
};
</script>

<style scoped lang="scss">
nav {
  position: relative;
  margin-top: 50px;
  a {
    margin: 0 10px;
  }
}
</style>