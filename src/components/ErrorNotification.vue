<template>
  <transition>
    <ul class="erro" v-if="notifications.length > 0">
      <li v-for="(notification, index) in notifications" :key="index" v-html="notification"></li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: "ErrorNotification",
  props: {
    notifications: Array
  }
};
</script>

<style lang="scss" scoped>
.erro {
  margin: 20px auto;
  li {
    color: #a60c0c;
    text-align: center;
  }
}
</style>