<template>
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
      <InputText placeholder="John" />
      <InputText placeholder="Doe" />
      <InputMask
        id="basic"
        mask="(99) 99999-9999"
        placeholder="(81) 99999-9999"
      />
      <InputText placeholder="email@exemplo.com" />
      <Button label="Salvar" />
    </form>
  </main>
</template>

<style scoped>
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
  gap: 15px;
}
</style>