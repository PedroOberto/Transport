<template>
  <section class="container">
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
      <button class="button" @click.prevent="updateUser">Atualizar</button>
    </form>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { getCep } from "@/services.js";
import { mapFields } from "@/helpers.js";
export default {
  name: "UserInfo",
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
    updateUser() {
      api.put(`/user/`, this.$store.state.user).then(() => {
        this.$store.dispatch("getUser");
        this.$router.push({ name: "user-box" });
      });
    }
  }
};
</script>

<style>
</style>