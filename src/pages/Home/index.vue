<template>
  <Toast />
  <main>
    <Table
      @filter="(data) => handleFilterData(data)"
      v-if="state.windowWidth >= 850"
      :contacts="state.contacts"
    />
    <table-minimal
      @filter="(data) => handleFilterData(data)"
      v-else
      :contacts="state.contacts"
    />
  </main>
  <Button
    icon="pi pi-plus"
    rounded
    aria-label="adicionar contato"
    class="btn-add-contact"
    @click="handleNavigateToRoute('create')"
  />
  <Button
    icon="pi pi-replay"
    rounded
    aria-label="limpar filtro de busca"
    class="btn-clear-filter"
    @click="handleFetchData()"
  />
</template>

<script>
import Table from "../../components/ContactsTable/Table.vue";
import TableMinimal from "../../components/ContactsTable/TableMinimal.vue";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, reactive } from "vue";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    Table,
    TableMinimal,
  },

  setup() {
    const router = useRouter();
    const state = reactive({
      contacts: [],
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      name: "",
      lastName: "",
    });
    const toast = useToast();

    const handleResize = () => {
      state.windowWidth = window.innerWidth;
      state.windowHeight = window.innerHeight;
    };

    function handleFetchData() {
      api.get("/Contact").then((res) => {
        state.contacts = res.data;
      });
    }

    function handleFilterData(data) {
      if (data.name == "" || data.lastName == "") {
        toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail:
            "Para efetuar uma busca, deve ser preenchido os campos de nome e sobrenome!",
          life: 3000,
        });
        return;
      }

      api
        .get(`/contact/search`, {
          params: {
            name: data.name,
            lastName: data.lastName,
          },
        })
        .then((res) => {
          state.contacts = res.data;
        });
    }

    function handleNavigateToRoute(name) {
      router.push({ name });
    }

    onMounted(() => {
      handleFetchData();
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      state,
      handleNavigateToRoute,
      handleFilterData,
      handleFetchData
    };
  },
};
</script>

<style scoped>
main {
  margin: 0px 0px 70px 0px;
  max-width: 100%;
}
.btn-add-contact {
  width: 60px;
  height: 60px;
  position: fixed;
  top: calc(100% - 70px);
  left: calc(100% - 70px);
}
.btn-clear-filter {
  width: 60px;
  height: 60px;
  position: fixed;
  top: calc(100% - 70px);
  right: calc(100% - 70px);
  border: none;
  background-color: #2196f3;
}
</style>