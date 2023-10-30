<template>
  <div class="contact-card">
    <div class="contact-card-info">
      <Avatar
        :label="state.initials"
        size="large"
        style="background-color: #2196f3; color: #ffffff"
        shape="circle"
      />
      <p class="contact-name">{{ name }} {{ lastName }}</p>
      <Button size="small" text raised icon="pi pi-phone" aria-label="ligar" />
      <Button
        size="small"
        text
        raised
        icon="pi pi-pencil"
        aria-label="editar contato"
        @click="handleNavigateToRoute()"
      />
    </div>
    <Divider />
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  flex-direction: column;
}

.contact-card-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.contact-name {
  width: 25%;
}
</style>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id", "name", "lastName"],

  setup(props) {
    const router = useRouter();
    const state = reactive({
      initials: "",
    });

    function handleGetInitials(name, lastName) {
      const firstLetter = name.split("")[0];
      const secondLetter = lastName.split("")[0];
      state.initials = `${firstLetter}${secondLetter}`;
    }

    function handleNavigateToRoute() {
      router.push({ name: 'edit', query: { contactId: props.id } });
    }

    onMounted(() => {
      handleGetInitials(props.name, props.lastName);
    });

    return {
      handleNavigateToRoute,
      state,
    };
  },
};
</script>