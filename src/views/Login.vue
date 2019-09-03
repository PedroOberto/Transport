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
        <ErrorNotification :notifications="notifications" />
      </form>
      <p class="recover-password">
        <a
          href="http://boxtransport.onlinewebshop.net/wp-login.php?action=lostpassword"
          target="_blank"
        >Recuperar senha</a>
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
      notifications: [],
      sectionLoginCreate: false
    };
  },
  components: {
    LoginCreate
  },
  created() {
    document.title = "Login";
  },
  methods: {
    loginUser() {
      this.notifications = [];
      document.getElementById("button-login").innerHTML = "Carregando...";
      this.$store
        .dispatch("loginUser", this.login)
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "user-info" });
        })
        .catch(error => {
          this.notifications.push(error.response.data.message);
          document.getElementById("button-login").innerHTML = "Login";
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