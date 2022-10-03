<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <p class="txt">
      Entre com seu nome de usuário e senha do TMDB ou como guest.
    </p>
    <form @submit.prevent="store.methods.getNewToken">
      <label for="user">Usuário</label>
      <input
        type="text"
        id="user"
        class="input-style"
        placeholder="user123"
        v-model="store.state.user"
      />

      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        placeholder="*********"
        class="input-style"
        v-model="store.state.password"
      />

      <button class="btn-padrao btn-entrar">Entrar</button>
    </form>

    <p class="no-account">
      Não possui conta? Você pode se registrar <a href="/">aqui</a> ou entrar
      com uma sessão local logo abaixo.
    </p>

    <button class="btn-padrao btn-sessao-local">
      Entrar com uma sessão local
    </button>
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
  margin-bottom: 0.5em;
}
.txt {
  margin-bottom: 2em;
  margin-top: 0.5em;
}
.btn-padrao {
  border: none;
}
input {
  width: 100%;
}

#user {
  margin-bottom: 1.5em;
}
.login {
  padding: 0 2em;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}
.no-account {
  margin: 1.5rem 0;
}
.no-account a {
  color: var(--cor-3);
  border-bottom: 1px dashed currentColor;
}

.btn-entrar {
  margin-top: 1.5em;
  margin-left: auto;
}

.btn-sessao-local {
  margin: 0 auto;
}

@media (max-width: 500px) {
  .btn-entrar,
  .btn-sessao-local {
    width: 100%;
  }
}
</style>
