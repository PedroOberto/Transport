<template>
  <header>
    <span class="logo">
      <router-link to="/">Transport</router-link>
    </span>
    <div class="button_menu" @click="menuToggle()">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <nav class="menu">
      <ul>
        <li>
          <router-link :to="{path: '/', hash: 'boxes'}">Caixas</router-link>
        </li>
        <li>
          <router-link to="/">Contato</router-link>
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
  },
  methods: {
    menuToggle() {
      const button = document.querySelector(".button_menu");
      const menu = document.querySelector(".menu");
      menu.classList.toggle("ativo");
      button.classList.toggle("rotate");
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

.logo {
  width: 200px;
  display: block;
  float: right;
  top: 10px;
  right: 15px;
  position: relative;
  a {
    font-size: 40px;
    font-weight: bold;
    color: #313b34;
  }
}
.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}
.button_menu {
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
}
.rotate .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  -moz-transform: rotate(-45deg) translate(-9px, 6px);
  -o-transform: rotate(-45deg) translate(-9px, 6px);
  -ms-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.rotate .bar2 {
  opacity: 0;
}
.rotate .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  -moz-transform: rotate(45deg) translate(-8px, -8px);
  -o-transform: rotate(45deg) translate(-8px, -8px);
  -ms-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
.menu {
  opacity: 0;
  transition: all 0.5s;
  position: relative;
  top: 60px;
  left: 10px;
  ul li {
    display: table;
  }
}
.menu.ativo {
  display: inline;
  opacity: 1;
}

@media screen and(min-width: 600px) {
  .button_menu {
    display: none;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    position: sticky;
  }
  .menu {
    opacity: 1;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    padding: 15px 20px;
    ul {
      display: flex;
      align-items: center;
      li a {
        font-size: 18px;
        display: block;
        color: #313b34;
        margin: 0 10px;
      }
    }
  }
}
</style>