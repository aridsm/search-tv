<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <p class="txt">Entre com seu nome de usuário e senha do TMDB.</p>
    <form @submit.prevent="loginStore.submitForm(username, password)">
      <label for="user">Usuário</label>
      <input
        type="text"
        id="user"
        class="input-style"
        placeholder="user123"
        v-model="username"
      />

      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        placeholder="*********"
        class="input-style"
        v-model="password"
      />
      <p v-if="loginStore.loginError" class="erro">
        {{ loginStore.loginError }}
      </p>
      <button class="btn-padrao btn-entrar">Entrar</button>
    </form>

    <p class="no-account">
      Não possui conta? Você pode se registrar
      <a href="https://www.themoviedb.org/signup">aqui</a>
    </p>
  </div>
</template>

<script>
import { useLoginStore } from "@/store/login";

export default {
  name: "LoginView",
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
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
.erro {
  color: rgb(255, 100, 100);
  margin-top: 1rem;
}
@media (max-width: 500px) {
  .btn-entrar,
  .btn-sessao-local {
    width: 100%;
  }
}
</style>
