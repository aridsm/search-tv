<template>
  <section class="container">
    <div class="account-details" v-if="store.state.userDetails">
      <div class="avatar">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${store.state.userDetails.avatar.tmdb.avatar_path}`"
          :alt="store.state.userDetails.username"
        />
      </div>
      <div class="infos">
        <p class="username">{{ store.state.userDetails.username }}</p>
        <h1 class="title">Sua conta</h1>
        <p v-if="store.state.userDetails.name" class="name">
          Olá, {{ store.state.userDetails.name }}!
        </p>
        <button class="btn-padrao" @click="store.methods.logout">
          Sair
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from "vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "AccountView",
  setup() {
    const store = inject("store");
    return { store };
  },
  components: { Loading },
};
</script>

<style scoped>
.avatar {
  width: 14rem;
  height: 14rem;
  border-radius: 5px;
  overflow: hidden;
}

.avatar > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.account-details {
  display: flex;
}

.infos {
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
}
.name {
  margin: 0.5rem 0;
}

.username {
  font-style: italic;
  color: var(--cor-4);
  margin-bottom: 0.5rem;
}

.btn-padrao {
  margin-top: auto;
  display: flex;
  align-self: flex-start;
}

.btn-padrao svg {
  width: 18px;
  height: 18px;
  margin-left: 0.5rem;
}
</style>
