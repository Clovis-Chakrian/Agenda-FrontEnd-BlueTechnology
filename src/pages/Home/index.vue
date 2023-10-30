<template>
  <main>
    <ContactCard />
  </main>
  <Button
    icon="pi pi-plus"
    rounded
    aria-label="adicionar contato"
    class="btn-add-contact"
    @click="handleNavigateToRoute('create')"
  />
</template>

<script>
import ContactCard from "../../components/ContactCard/index.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    ContactCard,
  },

  setup() {
    const router = useRouter();

    function handleNavigateToRoute(name) {
      router.push({ name });
    }

    return {
      handleNavigateToRoute
    }
  },
};
</script>

<style scoped>
.btn-add-contact {
  width: 60px;
  height: 60px;
  position: absolute;
  top: calc(100% - 70px);
  left: calc(100% - 70px);
}
</style>