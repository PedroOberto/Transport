<template>
  <section id="tracking" class="container section tracking">
    <div class="grid-16" v-if="box">
      <h2>Sua Encomenda</h2>
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
        <div class="grid-7 images">
          <div v-for="(image, index) in box.images" :key="index">
            <a @click.prevent="modalImage(index)">
              <img :src="image.src" :alt="image.title" />
            </a>
            <div :id="index" class="modal_image">
              <div class="modal_image_container">
                <button class="modal_image_fechar" @click="closeModalImage(index)">X</button>
                <a class="image_modal_before" @click.prevent="modalImageBefore(index)"><</a>
                <img :src="image.src" :alt="image.title" />
                <a class="image_modal_after" @click.prevent="modalImageAfter(index)">></a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-8 specification">
          <h5>{{box.title}}</h5>
          <p>Dimensões: {{box.dimension}}</p>
          <p class="size">Peso: {{box.weight}}</p>
        </div>
      </div>
    </div>
    <div v-if="notBox" class="modal_error">
      <div class="modal_error_container">
        <button class="modal_error_fechar" @click="closeModalError">X</button>
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
          .catch(() => {
            this.box = null;
            this.notBox = true;
          });
      }
    },
    scrollToTracking() {
      if (this.box) {
        window.scrollTo({
          top: document.querySelector(".tracking").offsetTop,
          behavior: "smooth"
        });
      }
    },
    closeModalError({ target, currentTarget }) {
      if (target === currentTarget) {
        this.notBox = false;
      }
    },
    closeModalImage(index) {
      document.getElementById(index).classList.remove("modal_image_active");
    },
    modalImageBefore(index) {
      if (document.getElementById(index - 1) != null) {
        document.getElementById(index).classList.remove("modal_image_active");
        document.getElementById(index - 1).classList.add("modal_image_active");
      }
    },
    modalImageAfter(index) {
      if (document.getElementById(index + 1) != null) {
        document.getElementById(index).classList.remove("modal_image_active");
        document.getElementById(index + 1).classList.add("modal_image_active");
      }
    },
    modalImage(index) {
      document.getElementById(index).classList.add("modal_image_active");
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
  z-index: 1;
  ul li {
    display: block;
    color: #3e3e3e;
  }
  .status {
    // width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      max-width: 60px;
      filter: grayscale(100%);
      opacity: 0.3;
    }
  }
  .airplane {
    :nth-child(-n + 3) {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
  .packed {
    :nth-child(1) {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
  .hand-over {
    :nth-child(-n + 5) {
      filter: grayscale(0%);
      opacity: 1;
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
    color: #3e3e3e;
    p {
      margin: 10px 0;
    }
  }
  .images {
    overflow-x: auto;
    overflow-y: auto;
    max-width: 600px;
    max-height: 350px;
    img {
      width: 600px;
    }
    a {
      cursor: pointer;
    }
  }
}

.modal_image::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.modal_image {
  z-index: 20;
  display: none;
}
.modal_image_active {
  display: block;
}
.modal_image_container {
  background: white;
  width: 60%;
  height: 80vh;
  min-width: 270px;
  padding: 10px;
  border-radius: 4px;
  margin: auto auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  img {
    margin: 0 auto;
    width: 70%;
    min-width: 250px;
    max-width: 100%;
    max-height: 100%;
  }
}
.modal_image_fechar {
  border-radius: 50%;
  border: 2px solid #000;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>