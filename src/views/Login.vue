<template>
  <section class="container section login">
    <h1>Login</h1>
    <form>
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password" />
      <button class="button" type="submit" @click.prevent="loginUser">Login</button>
    </form>
    <p class="recover-password">
      <a href="/" target="_blank">Recuperar senha</a>
    </p>
    <LoginCreate />
  </section>
</template>

<script>
import LoginCreate from "@/components/LoginCreate";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    LoginCreate
  },
  methods: {
    loginUser() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push({ name: "user" });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 100px 20px 0;
  form {
    display: grid;
    .button {
      width: 100%;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
.recover-password {
  text-align: center;
  margin: 20px auto;
  a:hover {
    color: red;
  }
}
</style>