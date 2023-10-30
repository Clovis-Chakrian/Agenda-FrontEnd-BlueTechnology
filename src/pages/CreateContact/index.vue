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
      <Button label="Adicionar contato" />
    </form>
  </main>
</template>