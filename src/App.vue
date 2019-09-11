<template>
  <div id="app">
    <TheHeader />
    <main id="main" class="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>
<script>
import { api } from "@/services.js";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    if (window.localStorage.token) {
      api
        .validateToken()
        .then(() => {
          this.$store.dispatch("getUser");
        })
        .catch(() => {
          window.localStorage.removeItem("token");
        });
    }
  }
};
</script>
<style lang="scss">
@import "@/../assets/scss/_variabless.scss";
@import "@/../assets/scss/_grid.scss";
* {
  box-sizing: border-box;
}
body,
ul,
li,
h1,
h2,
p {
  margin: 0px;
  padding: 0px;
}

/* Scrollbar */
::-webkit-scrollbar-track {
  background-color: $color-1;
}
::-webkit-scrollbar {
  width: 6px;
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: $color-2;
  height: 30px;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#main {
  flex: 1;
}
body {
  background: url("../src/assets/background.png") no-repeat top;
  background-attachment: fixed;
  @include type-1(18);
  font-size: 18px;
}
h1,
h2,
h3,
h4,
h5 {
  font-weight: normal;
}
h1 {
  margin: 0 auto;
}
h1,
h2,
h3 {
  text-align: center;
}
h1,
h2 {
  color: $color-1;
  line-height: 35px;
  margin: 60px 0;
  font-size: 35px;
}
h3 {
  color: $color-2;
  font-size: 24px;
  margin: 20px 0;
}
h4 {
  color: #6d4826;
  font-size: 24px;
  margin: 20px auto;
}
h5 {
  color: #427a55;
  font-size: 20px;
}
.section {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 0;
}
ul {
  list-style: none;
  li {
    display: inline-block;
  }
}
a {
  padding: 10px;
  display: block;
  color: #000;
  text-decoration: none;
}
img {
  max-width: 100%;
  border-radius: 4px;
  display: block;
}
form {
  margin: 0 auto;
  .button {
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
}
label {
  display: block;
  margin: 5px 0;
}
input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  font-size: 1rem;
  margin-bottom: 15px;
  width: 100%;
  border-color: $color-1;
}
input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: $color-1;
}

.button {
  text-decoration: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 10px;
  min-width: 90px;
  text-align: center;
  display: block;
  color: #65ba82;
  border-radius: 4px;
  border: solid 1px #65ba82;
  background: #fff;
  transition: all 0.5s;
  transform: scale(1);
  @include type-1(18);
  clear: both;
}

.button:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: 0;
  left: 0;
  background: #65ba82;
  border-radius: 3px;
  transition-property: width;
  transition-duration: 0.5s;
  border: solid 1px #fff;
}

.button:hover {
  color: #fff;
  border: solid 1px #fff;
}

.button:hover:before {
  z-index: -1;
  width: 100%;
  height: 100%;
}
.button-delete:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: 0;
  left: 0;
  background: #a60c0c;
  border-radius: 3px;
  transition-property: width;
  transition-duration: 0.5s;
  border: solid 1px #fff;
}
.button-delete {
  color: #a60c0c;
  border: 1px solid #a60c0c;
  position: relative;
  right: 5px;
  top: 5px;
}
.button-view:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  top: 0;
  left: 0;
  background: #6d4826;
  border-radius: 3px;
  transition-property: width;
  transition-duration: 0.5s;
  border: solid 1px #fff;
}
.button-view {
  color: #6d4826;
  border: 1px solid #6d4826;
  position: absolute;
  right: 5px;
  top: 5px;
}
.modal_error::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.modal_error {
  z-index: 20;
}
.modal_error_container {
  background: white;
  width: 300px;
  padding: 30px;
  border-radius: 4px;
  margin: 0 auto;
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  z-index: 10;
}
.modal_error_fechar {
  border-radius: 50%;
  border: 2px solid #000;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.modal_image::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.modal_image {
  z-index: 20;
  display: none;
}
.modal_image_active {
  display: block;
}
.modal_image_container {
  background: white;
  width: 80%;
  max-width: 542px;
  overflow: none;
  max-height: 50vh;
  padding: 10px;
  border-radius: 4px;
  margin: auto auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: block;
  align-items: center;
  img {
    max-height: 90%;
  }
  .arrows {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    img {
      max-width: 25px;
    }
  }
}
@media screen and (min-width: 500px) {
  .modal_image_container {
    max-height: 80vh;
  }
}
.modal_image_fechar {
  border-radius: 50%;
  border: 2px solid #000;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(-20px, 0, 0);
}
.v-leave-to {
  transform: translate3d(20px, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>
