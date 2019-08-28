<template>
  <section class="container">
    <h2>Adicionar Box</h2>
    <form>
      <div class="grid-8">
        <h3>Cliente</h3>
        <label for="client">Email</label>
        <input type="email" id="client" name="client" v-model="box.client" />
        <label for="country">Pais</label>
        <input type="text" id="country" name="country" v-model="box.recipient_country" />
        <label for="zipcode">Cep</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          maxlength="8"
          @keyup="getFillCep"
          v-model="box.recipient_zipcode"
        />
        <label for="state">Estado</label>
        <input type="text" id="state" name="state" v-model="box.recipient_state" />
        <label for="city">Cidade</label>
        <input type="text" id="city" name="city" v-model="box.recipient_city" />
        <label for="neighborhood">Bairro</label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          v-model="box.recipient_neighborhood"
        />
        <label for="street">Rua</label>
        <input type="text" id="street" name="street" v-model="box.recipient_street" />
        <label for="number">Numero</label>
        <input type="text" id="number" name="number" v-model="box.recipient_number" />
      </div>
      <div class="grid-8">
        <h3>Conteudo</h3>
        <label for></label>
        <label for="namebox">Descrição</label>
        <input type="text" id="namebox" name="namebox" v-model="box.namebox" />
        <label for="dimension">Dimenssão</label>
        <input type="text" id="dimension" name="dimension" v-model="box.dimension" />
        <label for="weight">Peso</label>
        <input type="text" id="weight" name="weight" v-model="box.weight" />
        <label for="images">Imagens</label>
        <input type="file" id="images" name="images" multiple ref="images" />
      </div>
      <button class="button" @click.prevent="addBox">Adicionar</button>
    </form>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { getCep } from "@/services.js";
export default {
  name: "UserAddBox",
  data() {
    return {
      box: {
        user_id: "",
        sender_country: "",
        sender_zipcode: "",
        sender_state: "",
        sendert_city: "",
        sender_neighborhood: "",
        sender_street: "",
        sender_number: "",
        client: "",
        recipient_country: "",
        recipient_zipcode: "",
        recipient_state: "",
        recipient_city: "",
        recipient_neighborhood: "",
        recipient_street: "",
        recipient_number: "",
        namebox: "",
        dimension: "",
        weight: "",
        images: null
      }
    };
  },
  methods: {
    infoBox() {
      this.box.user_id = this.$store.state.user.id;
      this.box.sender_country = this.$store.state.user.country;
      this.box.sender_zipcode = this.$store.state.user.zipcode;
      this.box.sender_state = this.$store.state.user.state;
      this.box.sendert_city = this.$store.state.user.city;
      this.box.sender_neighborhood = this.$store.state.user.neighborhood;
      this.box.sender_street = this.$store.state.user.street;
      this.box.sender_number = this.$store.state.user.number;
    },
    addBox() {
      this.infoBox();
      api.post("/box", this.box);
      this.$router.push({ name: "user-box" });
    },
    getFillCep() {
      const cep = this.box.recipient_zipcode.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(response => {
          this.street = response.data.logradouro;
          this.neighborhood = response.data.bairro;
          this.city = response.data.uf;
          this.state = response.data.localidade;
        });
      }
    }
  }
};
</script>

<style>
</style>