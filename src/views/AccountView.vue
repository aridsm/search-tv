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
        <h1 class="title">Sua conta</h1>
        <p>{{ store.state.userDetails.username }}</p>
        <p>{{ store.state.userDetails.name }}</p>
        <button class="btn-padrao" @click="store.methods.logout">Sair</button>
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
}
</style>
