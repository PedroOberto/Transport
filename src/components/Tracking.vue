<template>
  <section id="tracking" class="container tracking">
    <div class="grid-16" v-if="box">
      <h2>Encomenda</h2>
      <div class="box-id">
        <h4>Codigo: {{box.id}}</h4>
        <button
          v-if="this.$store.state.user.role === 'administrator'"
          class="button button-delete"
          @click.prevent="deleteBox(box.id)"
        >Deletar</button>
      </div>
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
            <a :id="index" @click.prevent="expandImage(index)">
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
    //Retorna a caixa de acordo com o id retrnado do computed urlCode()
    getBox() {
      if (this.urlCode) {
        this.$store.state.loading_tracking = true;
        api
          .get(`/box/${this.urlCode}`)
          .then(response => {
            this.box = response.data;
            if (response.data) {
              this.notBox = false;
              this.scrollToTracking();
              this.$store.state.loading_tracking = false;
            }
          })
          .catch(() => {
            this.box = null;
            this.notBox = true;
            this.$store.state.loading_tracking = false;
          });
      }
    },
    //Deleta a caixa com o id fornecido pelo botão "Deletar"
    deleteBox(id) {
      const confirm = window.confirm("Deseja remover?");
      if (confirm) {
        this.box = null;
        api.delete(`/box/${id}`);
        this.$router.push({ name: "user-box" });
      }
    },
    scrollToTracking() {
      window.scrollTo({
        top: document.querySelector(".tracking").offsetTop,
        behavior: "smooth"
      });
    },
    closeModalError({ target, currentTarget }) {
      if (target === currentTarget) {
        this.notBox = false;
      }
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
  position: relative;
  z-index: 1;
  ul li {
    display: block;
    color: #3e3e3e;
  }
  .box-id {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
</style>