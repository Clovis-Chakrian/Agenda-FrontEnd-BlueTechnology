<template>
  <DataTable :value="state.contacts" stripedRows tableStyle="min-width: 50rem">
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
</template>


<script>
import { onUpdated, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["contacts"],
  emits: ["filter"],
  setup(props, emiter) {
    const router = useRouter();
    const state = reactive({
      contacts: props.contacts,
      name: "",
      lastName: "",
    });

    function handleNavigateToEdit(id) {
      router.push({ name: "edit", query: { contactId: id } });
    }

    function handleFilterData() {
      emiter.emit("filter", {
        name: state.name,
        lastName: state.lastName,
      });
    }

    onUpdated(() => {
      state.contacts = props.contacts;
    });

    return {
      handleNavigateToEdit,
      state,
      handleFilterData
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
</style>