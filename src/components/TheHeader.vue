<template>
  <header>
    <nav>
      <span class="logo">
        <a href="#">Transport</a>
      </span>
      <ul>
        <li>
          <a href="#boxes">Caixas</a>
        </li>
        <li>
          <a href="#contact">Contato</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style lang="scss">
header {
  position: fixed;
  z-index: 2;
  width: 100%;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
}
nav ul li a {
  font-size: 18px;
  background: #313b34;
  color: #fff;
  border-radius: 4px;
}
.logo a {
  font-size: 40px;
  font-weight: bold;
}
</style>