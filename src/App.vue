<template>
  <div class="content">
    <header>
      <h1>Minha Agenda</h1>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #62bb82;
}
</style>
