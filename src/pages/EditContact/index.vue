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
      <Button label="Deletar" class="delete-btn" />
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

    onMounted(() => {
      handleGetContact();
    });

    function handleGetContact() {
      state.contactId = route.query.contactId;
      api
        .get(`/Contact/${state.contactId}`)
        .then((res) => {
          // console.log(res.data);
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

    function handleNotValidData() {
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
    }

    async function handleUpdateData() {
      const isValid = await v$.value.$validate();

      if (!isValid) {
        handleNotValidData();
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

    function handleDelete() {
      api
        .delete(`/Contact/${state.contactId}`)
        .then(() => {})
        .catch((err) => {
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
      clearErrors,
      handleUpdateData,
      v$,
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
  background-color: #9B111E;
  border: none;
}
</style>