<template>
  <div>
    <section class="container section login">
      <h1>Login</h1>
      <form>
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="login.email" />
        <label for="password">Senha</label>
        <input type="password" name="password" id="password" v-model="login.password" />
        <button id="button-login" class="button" type="submit" @click.prevent="loginUser">Login</button>
      </form>
      <p class="recover-password">
        <a href="/" target="_blank">Recuperar senha</a>
      </p>
    </section>
    <button
      class="button button-create"
      v-if="!sectionLoginCreate"
      @click.prevent="sectionLoginCreate = true"
    >Criar Login</button>
    <LoginCreate v-if="sectionLoginCreate" />
  </div>
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
      },
      sectionLoginCreate: false
    };
  },
  components: {
    LoginCreate
  },
  methods: {
    loginUser() {
      document.getElementById("button-login").innerHTML = "carregando...";
      document.getElementById("button-login").disabled = "true";
      this.$store.dispatch("loginUser", this.login).then(response => {
        this.$store.dispatch("getUser");
        this.$router.push({ name: "user-info" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 100px 20px 0;
  form {
    display: grid;
  }
}
.recover-password {
  text-align: center;
  margin: 20px auto;
  a:hover {
    color: red;
  }
}
.button-create {
  margin-bottom: 60px;
}
</style>