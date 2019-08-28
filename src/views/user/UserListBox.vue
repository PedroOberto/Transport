<template>
  <section class="container">
    <transition mode="out-in">
      <div v-if="this.user.role === 'administrator' && loading">
        <SearchForm />
        <transition mode="out-in">
          <TrackingAdmin />
        </transition>
        <h2>Encomendas</h2>
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
                <li>Logradouro{{box.recipient.street}}</li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Conteudo</h4>
            <div class="grid-6 images">
              {{box.images}}
              <img
                v-for="(image, index) in box.images"
                :key="index"
                :src="image.url"
                :alt="image.alt"
              />
            </div>
            <div class="grid-9 specification">
              <h5>{{box.title}}</h5>
              <p>Dimensões: {{box.dimension}}</p>
              <p class="size">Peso: {{box.weight}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.user.role === 'subscriber' && loading">
        <h2>Suas Encomendas</h2>
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
                <li>Logradouro{{box.sender.street}}</li>
              </ul>
            </div>
            <div>
              <h5>Destinatario</h5>
              <ul>
                <li>Pais: {{box.recipient.country}}</li>
                <li>Estado: {{box.recipient.state}}</li>
                <li>Cidade: {{box.recipient.city}}</li>
                <li>Bairo: {{box.recipient.neighborhood}}</li>
                <li>Logradouro{{box.recipient.street}}</li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Conteudo</h4>
            <div class="grid-6 images">
              <img
                v-for="(image, index) in box.images"
                :key="index"
                :src="image.url"
                :alt="image.alt"
              />
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
import Loading from "@/components/Loading.vue";
import SearchForm from "@/components/SearchForm.vue";
import TrackingAdmin from "@/components/TrackingAdmin.vue";
import { api } from "@/services.js";
export default {
  name: "UserListBox",
  components: {
    Loading,
    SearchForm,
    TrackingAdmin
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
    typeUser() {
      if (this.user.role === "administrator") {
        this.userAdmin();
      } else if (this.user.role === "subscriber") {
        this.userSubs();
      }
    },
    userAdmin() {
      api.get("/box").then(response => {
        this.listBox = response.data;
        this.loading = true;
      });
    },
    userSubs() {
      api.get(`/box?client=${this.user.email}`).then(response => {
        this.listBox = response.data;
        this.loading = true;
      });
    },
    async searchBox(id) {
      await window.scrollTo({
        top: document.querySelector(".admin-tracking").offsetTop,
        behavior: "smooth"
      });
      await this.$router.push({ query: { q: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.box-list {
  position: relative;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
}
</style>