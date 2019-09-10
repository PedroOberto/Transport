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
        <li @click="menuClose()">
          <router-link :to="{path: '/', hash: 'boxes'}">Caixas</router-link>
        </li>
        <li @click="menuClose()">
          <router-link to="/">Contato</router-link>
        </li>
        <li v-if="$store.state.login" @click="menuClose()">
          <router-link :to="{name: 'user-box'}" class="button">{{name}}</router-link>
        </li>
        <li v-else @click="menuClose()">
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
    },
    button() {
      return document.querySelector(".button_menu");
    },
    menu() {
      return document.querySelector(".menu");
    }
  },
  methods: {
    menuToggle() {
      this.menu.classList.toggle("ativo");
      this.button.classList.toggle("rotate");
    },
    menuClose() {
      this.menu.classList.remove("ativo");
      this.button.classList.remove("rotate");
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
  border-radius: 4px;
}
.button_menu {
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
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
.menu.ativo:before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: #65ba82;
}
.menu {
  display: none;
  position: relative;
  // top: 60px;
  // left: 10px;
  ul {
    margin: 0 auto;
    position: fixed;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    li {
      display: block;
      font-size: 30px;
      margin: 10px;
    }
  }

  animation: FadeOut 0.5s ease-in-out;
}
.menu.ativo {
  display: inline;
  display: block;
  animation: FadeIn 0.5s ease-in-out;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
    height: initial;
  }
  100% {
    opacity: 1;
    height: initial;
  }
}
@keyframes FadeOut {
  0% {
    opacity: 1;
    height: initial;
  }
  99% {
    opacity: 0;
    height: initial;
  }
  100% {
    height: 0;
    opacity: 0;
    height: 0;
  }
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
      // display: flex;
      position: relative;
      align-items: center;
      width: 100%;
      li {
        display: inline-flex;
        a {
          font-size: 18px;
          color: #313b34;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>