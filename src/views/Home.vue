<template>
  <div>
    <Search />
    <Tracking />
    <Boxes />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Tracking from "@/components/Tracking.vue";
import Boxes from "@/components/Boxes.vue";
export default {
  name: "home",
  components: {
    Search,
    Tracking,
    Boxes
  }
};
</script>
