<template>
  <div class="contact-card">
    <div class="contact-card-info">
      <Avatar
        :label="state.initials"
        size="small"
        style="background-color: #2196f3; color: #ffffff"
        shape="circle"
      />
      <p class="contact-name">{{ name }} {{ lastName }}</p>
      <Button
        size="small"
        class=".btn"
        text
        raised
        icon="pi pi-phone"
        aria-label="ligar"
        @click="handlePhoneCall(phone)"
      />
      <Button
        size="small"
        text
        raised
        icon="pi pi-pencil"
        aria-label="editar contato"
        class=".btn"
        @click="handleNavigateToRoute()"
      />
    </div>
    <a href="tel:+"></a>
    <Divider />
  </div>
</template>

<style scoped>
.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.contact-card-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
}

.contact-name {
  width: 90px;
  font-size: 14px;
}
.btn {
  width: 20px;
  height: 20px;
}
</style>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id", "name", "lastName", "phone"],

  setup(props) {
    const router = useRouter();
    const state = reactive({
      initials: "",
    });

    function handleGetInitials() {
      const firstLetter = props.name !== '' && props.name !== undefined  ? props.name.split("")[0] : '';
      const secondLetter = props.lastName !== '' && props.lastName !== undefined ? props.lastName.split("")[0] : '';
      state.initials = `${firstLetter}${secondLetter}`;
    }

    function handleNavigateToRoute() {
      router.push({ name: "edit", query: { contactId: props.id } });
    }

    function handlePhoneCall(phone) {
      window.open(`tel:+55${phone}`)
    }

    onMounted(() => {
      handleGetInitials(props.name, props.lastName);
    });

    return {
      handleNavigateToRoute,
      state,
      handlePhoneCall
    };
  },
};
</script>