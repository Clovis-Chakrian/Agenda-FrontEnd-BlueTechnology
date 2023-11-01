import { required, email, helpers } from '@vuelidate/validators'

const validationRules = {
  name: { required: helpers.withMessage('O campo nome é obrigatório', required) },
  lastName: { required: helpers.withMessage('O campo sobrenome é obrigatório', required) },
  phone: { required: helpers.withMessage('O campo celular é obrigatório', required) },
  email: { email: helpers.withMessage('Deve ser inserido um email váido.', email) }
};

export { validationRules };