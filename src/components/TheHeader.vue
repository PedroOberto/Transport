<template>
  <header>
    <nav>
      <span class="logo">
        <router-link to="/">Transport</router-link>
      </span>
      <ul>
        <li>
          <router-link :to="{path: '/', hash: 'boxes'}">Caixas</router-link>
        </li>
        <li>
          <router-link to="/">contato</router-link>
        </li>
        <li v-if="$store.state.login">
          <router-link :to="{name: 'user-box'}" class="button">{{name}}</router-link>
        </li>
        <li v-else>
          <router-link to="/login" class="button">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    name() {
      return this.$store.state.user.name.replace(/ .*/, "");
    }
  }
};
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  ul {
    display: flex;
    align-items: center;
    li a {
      font-size: 18px;
      color: #313b34;
      margin: 0 10px;
    }
  }
}
.logo a {
  font-size: 40px;
  font-weight: bold;
  color: #313b34;
}
</style>