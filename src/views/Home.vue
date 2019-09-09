<template>
  <div>
    <Search />
    <Tracking />
    <Boxes />
    <Contact />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Tracking from "@/components/Tracking.vue";
import Boxes from "@/components/Boxes.vue";
import Contact from "@/components/Contact.vue";
export default {
  name: "home",
  created() {
    document.title = "Transport";
  },
  components: {
    Search,
    Tracking,
    Boxes,
    Contact
  }
};
</script>
