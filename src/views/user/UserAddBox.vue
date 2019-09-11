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
        <label for="title">Descrição</label>
        <input type="text" id="title" name="title" v-model="box.title" />
        <label for="dimension">Dimenssão</label>
        <input type="text" id="dimension" name="dimension" v-model="box.dimension" />
        <label for="weight">Peso</label>
        <input type="text" id="weight" name="weight" v-model="box.weight" />
        <label for="images">Imagens</label>
        <input type="file" id="images" name="images" multiple ref="images" />
      </div>
      <button class="button" id="button-add-box" @click.prevent="addBox">Adicionar</button>
      <ErrorNotification :notifications="notifications" />
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
        title: "",
        dimension: "",
        weight: "",
        images: null
      },
      notifications: []
    };
  },
  methods: {
    infoBox() {
      const form = new FormData();
      const files = this.$refs.images.files;
      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }
      form.append("user_id", this.$store.state.user.id);
      form.append("sender_country", this.$store.state.user.country);
      form.append("sender_zipcode", this.$store.state.user.zipcode);
      form.append("sender_state", this.$store.state.user.state);
      form.append("sender_city", this.$store.state.user.city);
      form.append("sender_neighborhood", this.$store.state.user.neighborhood);
      form.append("sender_street", this.$store.state.user.street);
      form.append("sender_number", this.$store.state.user.number);

      form.append("client", this.box.client);

      form.append("recipient_country", this.box.recipient_country);
      form.append("recipient_zipcode", this.box.recipient_zipcode);
      form.append("recipient_state", this.box.recipient_state);
      form.append("recipient_city", this.box.recipient_city);
      form.append("recipient_neighborhood", this.box.recipient_neighborhood);
      form.append("recipient_street", this.box.recipient_street);
      form.append("recipient_number", this.box.recipient_number);

      form.append("title", this.box.title);
      form.append("dimension", this.box.dimension);
      form.append("weight", this.box.weight);

      return form;
    },
    addBox() {
      const box = this.infoBox();
      this.notifications = [];
      try {
        api.post("/box", box);
        document.getElementById("button-add-box").innerHTML = "Adicionando...";
        this.$router.push({ name: "user-box" });
      } catch (error) {
        document.getElementById("button-add-box").innerHTML = "Adicionar";
        this.notifications.push(error.response.data.message);
      }
    },
    getFillCep() {
      const cep = this.box.recipient_zipcode.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(response => {
          this.street = response.data.logradouro;
          this.neighborhood = response.data.bairro;
          this.city = response.data.localidade;
          this.state = response.data.uf;
        });
      }
    }
  }
};
</script>

<style>
</style>