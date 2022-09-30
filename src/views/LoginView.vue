<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <p>Entre com seu nome de usuário e senha do TMDB ou como guest.</p>
    <form @submit.prevent="store.methods.getNewToken">
      <label for="user">Usuário</label>
      <input
        type="text"
        id="user"
        class="input-style"
        v-model="store.state.user"
      />

      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        class="input-style"
        v-model="store.state.password"
      />

      <button class="btn-padrao">Entrar</button>
    </form>

    <p class="no-account">
      Não possui conta? Você pode se registrar <a href="/">aqui</a> ou entrar
      com uma sessão local logo abaixo.
    </p>

    <button class="btn-padrao">Entrar com uma sessão local</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "LoginView",
  setup() {
    const store = inject("store");
    return { store };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
label {
  position: relative;
  visibility: visible;
  display: block;
}
.btn-padrao {
  border: none;
}
input {
  width: 100%;
}
.login {
  padding: 0 2rem;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.no-account a {
  color: var(--cor-3);
  border-bottom: 1px dashed currentColor;
}
</style>
