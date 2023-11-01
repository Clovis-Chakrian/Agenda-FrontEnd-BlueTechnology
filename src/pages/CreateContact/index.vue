<template>
  <Toast />
  <header id="back-header">
    <Button
      icon="pi pi-arrow-left"
      aria-label="Voltar a página anterior"
      @click="handleGoBack()"
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
        v-model="state.name"
        @input="clearErrors()"
      />
      <small class="p-error" id="text-error">{{
        errors.name || "&nbsp;"
      }}</small>

      <label for="lastname">Sobrenome</label>
      <InputText
        placeholder="Doe"
        name="lastname"
        v-model="state.lastName"
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
        v-model="state.phone"
      />
      <small class="p-error" id="text-error">{{
        errors.phone || "&nbsp;"
      }}</small>

      <label for="email">Email</label>
      <InputText
        name="email"
        placeholder="email@exemplo.com"
        v-model="state.email"
        @input="clearErrors()"
      />
      <small class="p-error" id="text-error">{{
        errors.email || "&nbsp;"
      }}</small>

      <Button label="Adicionar contato" @click="handleCreateContact()" />
    </form>
  </main>
</template>

<script>
import { reactive } from "vue";
import { api } from "@/services/api";
import { validationRules } from "../../services/validation";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { handleNotValidData } from "@/utils/notValidErrorHandler";

export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      name: "",
      lastName: "",
      phone: "",
      email: "",
    });

    const errors = reactive({
      name: "",
      lastName: "",
      phone: "",
      email: "",
    });

    const v$ = useVuelidate(validationRules, state);
    const toast = useToast();

    async function handleCreateContact() {
      const isValid = await v$.value.$validate();

      if (!isValid) {
        handleNotValidData(errors, toast, v$);
        return;
      }

      api
        .post("/Contact", {
          ...state,
        })
        .then((res) => {
          toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail:
              "Contato adicionado com sucesso! Você será redirecionado para a tela inicial.",
            life: 3000,
          });

          setTimeout(() => {
            router.back();
          }, 1500);
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Erro!",
            detail:
              "Houve um erro ao salvar o contato. Tente novamente mais tarde!",
            life: 3000,
          });

          console.error(err);
        });
    }

    function clearErrors() {
      errors.name = "";
      errors.lastName = "";
      errors.phone = "";
      errors.email = "";
    }

    function handleGoBack() {
      router.back();
    }

    return {
      state,
      errors,
      v$,
      handleCreateContact,
      clearErrors,
      handleGoBack,
    };
  },
};
</script>

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