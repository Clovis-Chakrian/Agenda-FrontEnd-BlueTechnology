<template>
  <div class="contact-card">
    <div class="contact-card-info">
      <Avatar
        label="CC"
        size="large"
        style="background-color: #2196f3; color: #ffffff"
        shape="circle"
      />
      <p class="contact-name">Clóvis Chakrian</p>
      <Button size="small" text raised icon="pi pi-phone" aria-label="ligar" />
      <Button
        size="small"
        text
        raised
        icon="pi pi-pencil"
        aria-label="editar contato"
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