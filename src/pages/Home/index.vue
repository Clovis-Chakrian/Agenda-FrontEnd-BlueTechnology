<template>
  <main>
    <ContactCard />
  </main>
  <Button
    icon="pi pi-plus"
    rounded
    aria-label="adicionar contato"
    class="btn-add-contact"
  />
</template>

<script>
import ContactCard from '../../components/ContactCard/index.vue';
export default {
  components: {
    ContactCard
  },
  setup() {
    
  },
}
</script>

<style scoped>
.btn-add-contact {
  width: 60px;
  height: 60px;
  position: absolute;
  top: calc(100% - 70px);
  left: calc(100% - 70px);
}
</style>