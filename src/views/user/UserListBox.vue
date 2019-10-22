<template>
  <section class="container">
    <transition mode="out-in">
      <div v-if="this.user.role === 'administrator' && loading">
        <SearchForm />
        <transition mode="out-in">
          <Tracking />
        </transition>
        <div v-if="listBox.length == 0">
          <h2>Ainda não existe encomenda</h2>
        </div>
        <h2 v-else>Encomendas</h2>
        <div class="grid-16 tracking box-list" v-for="(box, index) in listBox" :key="index">
          <button class="button button-view" @click.prevent="searchBox(box.id)">Visualizar</button>
          <h4>Codigo: {{box.id}}</h4>
          <div class="address">
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
              <div v-for="(image, index) in box.images" :key="index">
                <a :id="image.title" @click.prevent="expandImage(image.title)">
                  <img :src="image.src" :alt="image.title" />
                </a>
              </div>
            </div>
            <div class="grid-8 specification">
              <h5>{{box.title}}</h5>
              <p>Dimensões: {{box.dimension}}</p>
              <p class="size">Peso: {{box.weight}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.user.role === 'subscriber' && loading">
        <div v-if="listBox.length == 0">
          <h2>Ainda não existe encomenda</h2>
        </div>
        <h2 v-else>Suas Encomendas</h2>
        <div class="grid-16 tracking box-list" v-for="(box, index) in listBox" :key="index">
          <h4>Codigo: {{box.id}}</h4>
          <div :class="box.status" class="status">
            <img src="@/assets/box-package.png" alt="Box Package" />
            <img src="@/assets/arrows.png" alt="Setas" />
            <img src="@/assets/airplane.png" alt="Avião" />
            <img src="@/assets/arrows.png" alt="Setas" />
            <img src="@/assets/home.png" alt="Casa" />
          </div>
          <div class="address">
            <div>
              <h5>Remetente</h5>
              <ul>
                <li>Pais: {{box.sender.country}}</li>
                <li>Estado: {{box.sender.state}}</li>
                <li>Cidade: {{box.sender.city}}</li>
                <li>Logradouro: {{box.sender.street}}</li>
              </ul>
            </div>
            <div>
              <h5>Destinatario</h5>
              <ul>
                <li>Pais: {{box.recipient.country}}</li>
                <li>Estado: {{box.recipient.state}}</li>
                <li>Cidade: {{box.recipient.city}}</li>
                <li>Bairo: {{box.recipient.neighborhood}}</li>
                <li>Logradouro: {{box.recipient.street}}</li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Conteudo</h4>
            <div class="grid-6 images">
              <div v-for="(image, index) in box.images" :key="index">
                <a :id="image.title" @click.prevent="expandImage(image.title)">
                  <img :src="image.src" :alt="image.title" />
                </a>
              </div>
            </div>
            <div class="grid-9 specification">
              <h5>{{box.title}}</h5>
              <p>Dimensões: {{box.dimension}}</p>
              <p class="size">Peso: {{box.weight}}</p>
            </div>
          </div>
        </div>
      </div>
      <Loading v-if="!loading" />
    </transition>
  </section>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import Tracking from "@/components/Tracking.vue";
import { api } from "@/services.js";
export default {
  name: "UserListBox",
  components: {
    SearchForm,
    Tracking
  },
  props: ["user"],
  data() {
    return {
      listBox: null,
      loading: false
    };
  },
  created() {
    this.typeUser();
  },
  methods: {
    //Obtem o tipo de usuario
    typeUser() {
      if (this.user.role === "administrator") {
        this.userAdmin();
      } else if (this.user.role === "subscriber") {
        this.userSubs();
      }
    },
    //Carrega todas as caixas se for um administrator
    userAdmin() {
      api.get("/box").then(response => {
        this.listBox = response.data;
        this.loading = true;
      });
    },
    //Carrega todas caixas com o email do subscriber
    userSubs() {
      api.get(`/box?client=${this.user.email}`).then(response => {
        this.listBox = response.data;
        this.loading = true;
      });
    },
    //Pega do input de busca o id da caixa
    async searchBox(id) {
      //Faz scroll na pagina
      await window.scrollTo({
        top: document.querySelector(".tracking").offsetTop,
        behavior: "smooth"
      });
      //Envia pelo router o parametro com o id da caixa
      await this.$router.push({ query: { q: id } });
    },
    expandImage(index) {
      var el = document.querySelectorAll(".image_expand");
      for (let i = 0; i < el.length; i++) {
        if (el[i] != document.getElementById(index)) {
          el[i].classList.remove("image_expand");
        }
      }
      document.getElementById(index).classList.toggle("image_expand");
    }
  }
};
</script>

<style lang="scss" scoped>
.box-list {
  background: url("../../../src/assets/bg-box.png") no-repeat bottom right
    #ffffffa1;
  background-size: 60%;
  position: unset;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  border: 1px solid #e9e9e9;
}
</style>