<template>
  <section id="tracking" class="container section tracking">
    <div class="grid-16" v-if="box">
      <h2>Sua Encomenda</h2>
      <h4>Codigo: {{box.id}}</h4>
      <div class="status">
        <img src="@/assets/box-package.png" class="active" alt="Box Package" />
        <img src="@/assets/arrows.png" class="active" alt="Setas" />
        <img src="@/assets/airplane.png" class="active" alt="Avião" />
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
            <li>Logradouro{{box.sender.street}}</li>
          </ul>
        </div>
        <div>
          <h5>Endereço de entrega</h5>
          <ul>
            <li>Pais: {{box.recipient.country}}</li>
            <li>Estado: {{box.recipient.state}}</li>
            <li>Cidade: {{box.recipient.city}}</li>
            <li>Logradouro{{box.recipient.street}}</li>
          </ul>
        </div>
      </div>
      <div>
        <h4>Conteudo</h4>
        <div class="grid-16 items" v-for="(item, index) in box.items" :key="index">
          <div class="grid-6 images">
            <img src="@/assets/foto-1.jpg" alt="tracking" />
          </div>
          <div class="grid-9 specification">
            <h5>{{item.specification.name}}</h5>
            <p>Dimensões: {{item.specification.dimension}}</p>
            <p class="size">Peso: {{item.specification.weight}}</p>
          </div>
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
  name: "Tracking",
  data() {
    return {
      box: null,
      notBox: false
    };
  },
  computed: {
    urlCode() {
      this.box = null;
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
              this.scrollToTracking();
            }
          })
          .catch(error => {
            console.log(error);
            this.box = null;
            this.notBox = true;
          });
      }
    },
    scrollToTracking() {
      if (this.box) {
        window.scrollTo(0, document.querySelector(".tracking").offsetTop);
      }
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.notBox = false;
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
.tracking {
  ul li {
    display: block;
    color: #88aa8e;
  }
  .status {
    // width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      max-width: 60px;
      filter: grayscale(100%);
    }
    .active {
      filter: grayscale(0%);
    }
  }
  .address {
    display: flex;
    justify-content: space-around;
  }
  .items {
    margin: 20px auto;
    border-radius: 4px;
    padding: 10px 0;
    background: #fbfbfb;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  }
  .specification {
    color: #88aa8e;
    p {
      margin: 10px 0;
    }
  }
  .images {
    // display: flex;
    overflow-x: auto;
    max-width: 600px;
    img {
      width: 600px;
    }
  }
}
</style>