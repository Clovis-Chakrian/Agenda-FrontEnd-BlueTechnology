<template>
  <Toast />
  <main>
    <DataTable
      :value="state.contacts"
      stripedRows
      tableStyle="min-width: 50rem"
      v-if="state.windowWidth >= 850"
    >
      <template #header>
        <div class="table-header">
          <span class="text-xl text-900 font-bold">Meus contatos</span>
          <div class="p-inputgroup flex-1" id="teste">
            <InputText placeholder="Nome" v-model="state.name" />
            <InputText placeholder="Sobrenome" v-model="state.lastName" />
            <Button label="Buscar" @click="handleFilterData()" />
          </div>
        </div>
      </template>
      <Column header="Avatar">
        <template #body="contact">
          <Avatar
            :label="`${contact.data.name.split('')[0]}${
              contact.data.lastName.split('')[0]
            }`"
            size="large"
            style="background-color: #2196f3; color: #ffffff"
            shape="circle"
          />
        </template>
      </Column>
      <Column field="name" header="Nome"></Column>
      <Column field="lastName" header="Sobrenome"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Celular"></Column>
      <Column header="Avatar">
        <template #body="contact">
          <Button
            size="small"
            text
            raised
            icon="pi pi-pencil"
            aria-label="editar contato"
            @click="handleNavigateToEdit(contact.data.id)"
          />
        </template>
      </Column>
    </DataTable>
    <DataTable
      :value="state.contacts"
      stripedRows
      tableStyle="max-width: 100%"
      v-else
    >
      <template #header>
        <div class="table-header">
          <span class="text-xl text-900 font-bold">Meus contatos</span>
          <div class="p-inputgroup flex-1" id="teste">
            <InputText placeholder="Nome" v-model="state.name" />
            <InputText placeholder="Sobrenome" v-model="state.lastName" />
            <Button label="Buscar" @click="handleFilterData()" />
          </div>
        </div>
      </template>
      <Column header="Avatar">
        <template #body="contact">
          <Avatar
            :label="`${contact.data.name.split('')[0]}${
              contact.data.lastName.split('')[0]
            }`"
            size="large"
            style="background-color: #2196f3; color: #ffffff"
            shape="circle"
          />
        </template>
      </Column>
      <Column field="name" header="Nome"></Column>
      <Column field="lastName" header="Sobrenome"></Column>
      <Column header="Editar">
        <template #body="contact">
          <Button
            size="small"
            text
            raised
            icon="pi pi-pencil"
            aria-label="editar contato"
            @click="handleNavigateToEdit(contact.data.id)"
          />
        </template>
      </Column>
    </DataTable>
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
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { api } from "../../services/api";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    ContactCard,
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

    function handleFilterData() {
      if (state.name == "" || state.lastName == "") {
        toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail:
            "Para efetuar uma busca, deve ser preenchido os campos de nome e sobrenome!",
          life: 3000,
        });
        return;
      }

      console.log(state.name, state.lastName);

      api
        .get(`/contact/search`, {
          params: {
            name: state.name,
            lastName: state.lastName,
          },
        })
        .then((res) => {
          state.contacts = res.data;
        });
    }

    function handleNavigateToRoute(name) {
      router.push({ name });
    }

    function handleNavigateToEdit(id) {
      router.push({ name: "edit", query: { contactId: id } });
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
      handleNavigateToEdit,
      handleFilterData,
    };
  },
};
</script>

<style scoped>
.table-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#teste {
  height: 40px;
  max-width: 350px;
}
main {
  margin: 0px 0px 70px 0px;
}
.btn-add-contact {
  width: 60px;
  height: 60px;
  position: fixed;
  top: calc(100% - 90px);
  left: calc(100% - 90px);
}
@media (max-width: 850px) {
  .table-header {
    flex-direction: column;
    padding: 0px 40px;
    gap: 10px;
    align-items: center;
  }
}
</style>