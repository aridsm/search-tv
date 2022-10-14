<template>
  <section class="container">
    <h1 class="title">Sua conta</h1>
    <div class="account-details container-style" v-if="loginStore.userDetails">
      <div class="avatar">
        <img
          v-if="loginStore.userDetails.avatar.tmdb.avatar_path"
          :src="`https://image.tmdb.org/t/p/w780/${loginStore.userDetails.avatar.tmdb.avatar_path}`"
          :alt="loginStore.userDetails.username"
        />
        <NoImage v-else img="person" />
      </div>
      <div class="infos">
        <p class="username" v-if="loginStore.userDetails.username">
          {{ loginStore.userDetails.username }}
        </p>
        <p v-if="loginStore.userDetails.name" class="name">
          Olá, {{ loginStore.userDetails.name }}!
        </p>
        <button class="btn-padrao" @click="loginStore.logout">
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
    <ListMovies
      title="Seus favoritos"
      class="list-movies"
      :getListMovies="
        getFavoriteMovies(loginStore.userDetails?.id, loginStore.session_id)
      "
    />
  </section>
</template>

<script>
import Loading from "@/components/ui/Loading.vue";
import ListMovies from "@/components/ListMovies/ListMovies.vue";
import { useLoginStore } from "@/store/login";
import { getFavoriteMovies } from "@/urlsAPI";
import NoImage from "@/components/ui/NoImage.vue";

export default {
  name: "AccountView",
  setup() {
    const loginStore = useLoginStore();
    return { loginStore, getFavoriteMovies };
  },
  data() {
    return {
      movies: null,
    };
  },
  components: { Loading, ListMovies, NoImage },
};
</script>

<style scoped>
.avatar {
  height: 14rem;
  width: 14rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.avatar > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.account-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
}

.title,
.account-details {
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}

.infos {
  display: flex;
  flex-direction: column;
}
.name {
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}

.username {
  color: var(--cor-5);
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

.list-movies {
  margin-top: 6rem;
}
.container {
  padding-top: 2rem;
}
</style>
