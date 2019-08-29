<template>
  <section class="container section create-login">
    <h2>Meus Dados</h2>
    <form>
      <div class="grid-8">
        <label for="country">Pais</label>
        <input type="text" id="country" name="country" v-model="country" />
        <label for="zipcode">Cep</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          maxlength="8"
          @keyup="getFillCep"
          v-model="zipcode"
        />
        <label for="state">Estado</label>
        <input type="text" id="state" name="state" v-model="state" />
        <label for="city">Cidade</label>
        <input type="text" id="city" name="city" v-model="city" />
        <label for="neighborhood">Bairro</label>
        <input type="text" id="neighborhood" name="neighborhood" v-model="neighborhood" />
        <label for="street">Rua</label>
        <input type="text" id="street" name="street" v-model="street" />
        <label for="number">Numero</label>
        <input type="text" id="number" name="number" v-model="number" />
      </div>
      <div class="grid-8">
        <label for="name">Nome</label>
        <input type="text" id="name" name="name" v-model="name" />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" />
        <label for="password">Senha</label>
        <input type="password" id="password" name="password" v-model="password" />
      </div>
      <button id="button-create-login" class="button" @click.prevent="createUser">Criar</button>
      <ErrorNotification :notifications="notifications" />
    </form>
  </section>
</template>

<script>
import { getCep } from "@/services.js";
import { mapFields } from "@/helpers.js";
export default {
  name: "LoginCreate",
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "country",
        "zipcode",
        "state",
        "city",
        "neighborhood",
        "street",
        "number"
      ],
      base: "user",
      mutation: "UPDATE_USER"
    })
  },
  methods: {
    async createUser() {
      this.notifications = [];
      try {
        document.getElementById("button-create-login").innerHTML =
          "Carregando...";
        document.getElementById("button-create-login").disabled = "true";
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("loginUser", this.$store.state.user);
        await this.$store.dispatch("getUser");
        this.$router.push({ name: "user-box" });
      } catch (error) {
        document.getElementById("button-create-login").innerHTML = "Criar";
        this.notifications.push(error.response.data.message);
      }
    },
    getFillCep() {
      const cep = this.zipcode.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(response => {
          this.street = response.data.logradouro;
          this.neighborhood = response.data.bairro;
          this.city = response.data.uf;
          this.state = response.data.localidade;
        });
      }
    },
    scrollToCrateLogin() {
      setTimeout(function() {
        window.scrollTo({
          top: document.querySelector(".create-login").offsetTop,
          behavior: "smooth"
        });
      }, 100);
    }
  },
  created() {
    this.scrollToCrateLogin();
  }
};
</script>

<style scoped lang="scss">
</style>