<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <header id="back-header">
    <Button
      icon="pi pi-arrow-left"
      aria-label="Voltar a página anterior"
      @click="handleGoBack()"
    />
    <Button
      class="delete-btn"
      icon="pi pi-trash"
      aria-label="deletar contato"
      @click="handleDeleteConfirmation()"
    />
  </header>
  <main class="main">
    <Avatar
      label="CC"
      size="xlarge"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
    />
    <form class="form">
      <label for="name">Nome *</label>
      <InputText
        name="name"
        placeholder="John"
        v-model="state.contact.name"
        @input="clearErrors()"
      />
      <small class="p-error" id="text-error">{{
        errors.name || "&nbsp;"
      }}</small>

      <label for="lastname">Sobrenome</label>
      <InputText
        placeholder="Doe"
        name="lastname"
        v-model="state.contact.lastName"
        @input="clearErrors()"
      />
      <small class="p-error" id="text-error">{{
        errors.lastName || "&nbsp;"
      }}</small>

      <label for="phone">Celular *</label>
      <InputMask
        id="basic"
        mask="(99) 99999-9999"
        placeholder="(81) 99999-9999"
        name="phone"
        v-model="state.contact.phone"
      />
      <small class="p-error" id="text-error">{{
        errors.phone || "&nbsp;"
      }}</small>

      <label for="email">Email</label>
      <InputText
        name="email"
        placeholder="email@exemplo.com"
        v-model="state.contact.email"
        @input="clearErrors()"
      />
      <small class="p-error" id="text-error">{{
        errors.email || "&nbsp;"
      }}</small>

      <Button label="Atualizar" @click="handleUpdateData()" />
    </form>
  </main>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/services/api";
import { validationRules } from "../../services/validation";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { handleNotValidData } from "../../utils/notValidErrorHandler";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      contactId: "",
      contact: {
        name: "",
        lastName: "",
        phone: "",
        email: "",
      },
    });

    const errors = reactive({
      name: "",
      lastName: "",
      phone: "",
      email: "",
    });

    const v$ = useVuelidate(validationRules, state.contact);
    const toast = useToast();
    const confirmDialog = useConfirm();

    onMounted(() => {
      handleGetContact();
    });

    function handleGetContact() {
      state.contactId = route.query.contactId;
      api
        .get(`/Contact/${state.contactId}`)
        .then((res) => {
          const { name, lastName, phone, email } = res.data;
          state.contact.name = name;
          state.contact.lastName = lastName;
          state.contact.phone = phone;
          state.contact.email = email;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    async function handleUpdateData() {
      const isValid = await v$.value.$validate();

      if (!isValid) {
        handleNotValidData(errors, toast, v$);
        return;
      }

      api
        .put(`/Contact/${state.contactId}`, {
          ...state.contact,
        })
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail:
              "Contato atualizado com sucesso! Você será redirecionado para a tela inicial.",
            life: 3000,
          });

          setTimeout(() => {
            router.back();
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    async function handleDelete() {
      api
        .delete(`/Contact/${state.contactId}`)
        .then(() => {
          toast.add({
            severity: "info",
            summary: "Contato deletado com sucesso!",
            detail: `${state.contact.name} ${state.contact.lastName} foi removido de sua lista de contatos com sucesso! Você será redirecionado para a página inicial agora.`,
            life: 5000,
          });

          setTimeout(() => {
            router.back();
          }, 4500);
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Erro!",
            detail:
              "Houve um erro ao deletar o contato! Tente novamente mais tarde.",
            life: 3000,
          });
        });
    }

    function handleDeleteConfirmation() {
      confirmDialog.require({
        message: `Você deseja mesmo remover ${state.contact.name} ${state.contact.lastName} da sua lista de contatos?`,
        header: "Atenção!",
        icon: "pi pi-info-circle",
        rejectClass: "p-button-text p-button-text",
        acceptClass: "p-button-danger p-button-text",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          handleDelete();
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Ação cancelada!",
            detail: "O contato não foi deletado.",
            life: 3000,
          });
        },
      });
    }

    function handleGoBack() {
      router.back();
    }

    function clearErrors() {
      errors.name = "";
      errors.lastName = "";
      errors.phone = "";
      errors.email = "";
    }

    return {
      state,
      errors,
      clearErrors,
      handleUpdateData,
      handleDeleteConfirmation,
      v$,
      handleGoBack,
    };
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: calc(800px * 0.9);
  gap: 8px;
}
.delete-btn {
  background-color: #9b111e;
  border: none;
}
</style>

<style scoped>
#back-header {
  width: 100%;
  max-width: calc(800px * 0.9);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>