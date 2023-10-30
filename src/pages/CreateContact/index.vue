<template>
  <Toast />
  <header>
    <a href="">Voltar</a>
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
        errors.name =
          v$.value.name.$errors.length > 0
            ? v$.value.name.$errors[0].$message
            : "";

        errors.lastName =
          v$.value.lastName.$errors.length > 0
            ? v$.value.lastName.$errors[0].$message
            : "";

        errors.phone =
          v$.value.phone.$errors.length > 0
            ? v$.value.phone.$errors[0].$message
            : "";

        errors.email =
          v$.value.email.$errors.length > 0
            ? v$.value.email.$errors[0].$message
            : "";

        toast.add({
          severity: "error",
          summary: "Erro de validação!",
          detail:
            "Houve um erro ao validar os dados recebidos. Verifique se estão todos nos formatos corretos e tente novamente.",
          life: 3000,
        });
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
            detail: "Contato adicionado com sucesso! Você será redirecionado para a tela inicial.",
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

    return {
      state,
      errors,
      v$,
      handleCreateContact,
      clearErrors,
    };
  },
};
</script>