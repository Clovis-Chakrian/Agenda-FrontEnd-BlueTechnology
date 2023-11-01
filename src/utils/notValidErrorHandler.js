function handleNotValidData(errorArray, toastService, v$) {
  errorArray.name =
    v$.value.name.$errors.length > 0
      ? v$.value.name.$errors[0].$message
      : "";

  errorArray.lastName =
    v$.value.lastName.$errors.length > 0
      ? v$.value.lastName.$errors[0].$message
      : "";

  errorArray.phone =
    v$.value.phone.$errors.length > 0
      ? v$.value.phone.$errors[0].$message
      : "";

  errorArray.email =
    v$.value.email.$errors.length > 0
      ? v$.value.email.$errors[0].$message
      : "";

  toastService.add({
    severity: "error",
    summary: "Erro de validação!",
    detail:
      "Houve um erro ao validar os dados recebidos. Verifique se estão todos nos formatos corretos e tente novamente.",
    life: 3000,
  });
}

export { handleNotValidData }