<template>
  <main>
    <ContactCard v-for="contact in state.contacts" :key="contact.id" :name="contact.name" :lastName="contact.lastName" :id="contact.id"/>
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
import { onMounted, reactive } from "vue";
import { api } from "../../services/api";

export default {
  components: {
    ContactCard,
  },

  setup() {
    const router = useRouter();
    const state = reactive({
      contacts: [],
    });

    function handleFetchData() {
      api.get("/Contact").then((res) => {
        state.contacts = res.data;
      });
    }

    function handleNavigateToRoute(name) {
      router.push({ name });
    }

    onMounted(() => {
      handleFetchData();
    });

    return {
      state,
      handleNavigateToRoute,
    };
  },
};
</script>

<style scoped>
main {
  margin: 0px 0px 70px 0px;
}
.btn-add-contact {
  width: 60px;
  height: 60px;
  position: fixed;
  top: calc(100% - 70px);
  left: calc(100% - 70px);
}
</style>