<template>
  <div class="content">
    <div id="filter">
      <InputText class="input" placeholder="Nome" v-model="state.name" />
      <InputText
        class="input"
        placeholder="Sobrenome"
        v-model="state.lastName"
      />
      <Button class="btn" label="Buscar" @click="handleFilterData()" />
    </div>

    <contact-card
      v-for="contact in state.contacts"
      :id="contact.id"
      :key="contact.id"
      :name="contact.name"
      :lastName="contact.lastName"
      :phone="contact.phone"
    />
  </div>
</template>


<script>
import { onMounted, onUpdated, reactive } from "vue";
import { useRouter } from "vue-router";
import ContactCard from "../ContactCard/index.vue";

export default {
  props: ["contacts"],
  emits: ["filter"],
  components: {
    ContactCard,
  },
  setup(props, emiter) {
    const router = useRouter();
    const state = reactive({
      contacts: [],
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

      (state.name = ""), (state.lastName = "");
    }

    onUpdated(() => {
      state.contacts = typeof props.contacts == "string" ? [] : props.contacts;
    });

    onMounted(() => {
      state.contacts = typeof props.contacts == "string" ? [] : props.contacts;
    });

    return {
      handleNavigateToEdit,
      state,
      handleFilterData,
    };
  },
};
</script>

<style scoped>
#filter {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 25px;
}
.input {
  width: 100%;
}
.btn {
  width: 100%;
}
</style>