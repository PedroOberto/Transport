<template>
  <section id="admin-tracking" class="container section tracking">
    <div class="grid-16" v-if="box">
      <h4>Codigo: {{box.id}}</h4>
      <button class="button button-delete" @click.prevent="deleteBox(box.id)">Deletar</button>
      <div :class="box.status" class="status">
        <img src="@/assets/box-package.png" alt="Box Package" />
        <img src="@/assets/arrows.png" alt="Setas" />
        <img src="@/assets/airplane.png" alt="Avião" />
        <img src="@/assets/arrows.png" alt="Setas" />
        <img src="@/assets/home.png" alt="Casa" />
      </div>
      <div class="address">
        <div>
          <h5>Remetente da entrega</h5>
          <ul>
            <li>Pais: {{box.sender.country}}</li>
            <li>Estado: {{box.sender.state}}</li>
            <li>Cidade: {{box.sender.city}}</li>
            <li>Logradouro: {{box.sender.street}}</li>
          </ul>
        </div>
        <div>
          <h5>Endereço de entrega</h5>
          <ul>
            <li>Pais: {{box.recipient.country}}</li>
            <li>Estado: {{box.recipient.state}}</li>
            <li>Cidade: {{box.recipient.city}}</li>
            <li>Bairro: {{box.recipient.neighborhood}}</li>
            <li>Logradouro: {{box.recipient.street}}</li>
          </ul>
        </div>
      </div>
      <div>
        <h4>Conteudo</h4>
        <div class="grid-6 images">
          <img v-for="(image, index) in box.images" :key="index" :src="image.url" :alt="image.alt" />
        </div>
        <div class="grid-9 specification">
          <h5>{{box.title}}</h5>
          <p>Dimensões: {{box.dimension}}</p>
          <p class="size">Peso: {{box.weight}}</p>
        </div>
      </div>
    </div>
    <div v-if="notBox" class="modal_error">
      <div class="modal_error_container">
        <button class="modal_error_fechar" @click="closeModal">X</button>
        <p>nenhuma caixa encontrada</p>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "TrackingAdmin",
  data() {
    return {
      box: null,
      notBox: false
    };
  },
  computed: {
    urlCode() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += this.$route.query[key];
      }
      return queryString;
    }
  },
  methods: {
    getBox() {
      if (this.urlCode) {
        api
          .get(`/box/${this.urlCode}`)
          .then(response => {
            this.box = response.data;
            if (response.data) {
              this.notBox = false;
            }
          })
          .catch(() => {
            this.box = null;
            this.notBox = true;
          });
      }
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.notBox = false;
      }
    },
    deleteBox(id) {
      const confirm = window.confirm("Deseja remover?");
      if (confirm) {
        api.delete(`/box/${id}`).then(() => {
          this.box = null;
        });
      }
    }
  },
  watch: {
    urlCode() {
      this.getBox();
    }
  },
  created() {
    this.getBox();
  }
};
</script>

<style lang="scss">
</style>