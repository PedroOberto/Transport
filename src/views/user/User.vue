<template>
  <section class="container section">
    <nav class="menu_user">
      <ul>
        <li>
          <router-link class="button" :to="{name: 'user-info'}">Meus Dados</router-link>
        </li>
        <li>
          <router-link
            v-if="this.user.role === 'administrator'"
            class="button"
            :to="{name: 'add-box'}"
          >Adicionar Box</router-link>
        </li>
        <li>
          <router-link
            v-if="this.user.role === 'administrator'"
            class="button"
            :to="{name: 'user-box'}"
          >Caixas</router-link>
        </li>
        <li>
          <router-link
            v-if="this.user.role === 'subscriber'"
            class="button"
            :to="{name: 'user-box'}"
          >Minhas Caixas</router-link>
        </li>
        <li>
          <button class="button" @click.prevent="logout">Deslogar</button>
        </li>
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
  created() {
    document.title = "Usuario";
  },
  computed: {
    ...mapState(["login", "user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="scss">
.menu_user {
  position: relative;
  margin-top: 50px;
  ul li {
    display: block;
  }
  a {
    margin: 10px;
  }
  .button {
    margin: 10px;
  }
}
</style>