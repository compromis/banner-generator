<template>
  <div class="admin">
    <h1>admin</h1>
    <div class="tools">
      <label>
        <input type="checkbox" v-model="onlyWithPreview">
        Només banners descarregats
      </label>
    </div>
    <div v-if="user" class="tools">
        Mostrant banners de l'usuari {{ user }}
        <button @click="user = null">Mostra tots</button>
    </div>
    <ul class="banners" v-if="banners">
      <li v-for="banner in banners.data" :key="banner.id" class="banner-item" :class="{ 'deleted': !!banner.deleted_at }">
        <ul class="banner-item-meta">
          <li class="title">
            <router-link :to="`/editor/${banner.ref}`">{{ banner.title }}</router-link>
          </li>
          <li>
            <span class="label">Plantilla</span>
            <span class="value">{{ banner.type }}</span>
          </li>
          <li>
            <span class="label">Data</span>
            <span class="value">{{ banner.created_at }} &gt; {{ banner.updated_at }}</span>
          </li>
          <li>
            <span class="label">Usuari</span>
            <span class="value">
              <button @click="setUser(banner.user_id)" class="user-button">
                {{ banner.user.first_name }} {{ banner.user.last_name }}
              </button>
            </span>
          </li>
          <li>
            <span class="label">Col·lectiu</span>
            <span class="value">{{ banner.user.collectiu }}</span>
          </li>
          <li>
            <span class="label">IP</span>
            <span class="value">{{ banner.ip }}</span>
          </li>
          <li>
            <span class="label">UA</span>
            <span class="value">
              <input type="text" class="ua-input" :value="banner.ua">
            </span>
          </li>
        </ul>
        <div v-if="banner.preview" class="banner-item-preview">
          <img :src="banner.preview">
        </div>
      </li>
    </ul>

    <div class="tools pagination" v-if="banners">
      <button @click="prevPage" v-if="banners.page > 1">&lt; Anterior</button>
      <button @click="nextPage" v-if="banners.page < banners.lastPage">Següent &gt;</button>
    </div>
  </div>
</template>

<script>
import http from '@/http'

export default {
  name: 'Admin',

  data () {
    return {
      banners: null,
      page: 1,
      user: null,
      onlyWithPreview: true
    }
  },

  async created () {
    try {
      await this.getBanners()
    } catch (error) {
      this.$router.push('/')
    }
  },

  watch: {
    page () {
      this.getBanners()
    },

    user () {
      this.getBanners()
    },

    onlyWithPreview () {
      this.getBanners()
    }
  },

  methods: {
    async getBanners () {
      const { page, user, onlyWithPreview } = this
      this.banners = await http.all(page, user, onlyWithPreview)
    },

    setUser (user) {
      this.user = user
      window.scrollTo(0, 0)
    },

    nextPage () {
      this.page++
      window.scrollTo(0, 0)
    },

    prevPage () {
      this.page--
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/variables';

  .admin {
    background: $gray-900;
    color: $white;
    min-height: 100vh;
    padding: 10rem 1rem;

    h1 {
      font-size: 6rem;
      line-height: 1;
    }
  }

  .tools {
    padding: 1rem;
    margin: 2rem 0;
    background: $gray-800;
    border-radius: .75rem;
  }

  .banners {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 2rem;
    row-gap: 4rem;

    .banner-item {
      &-meta {
        margin-bottom: 1rem;

        .title {
          font-size: 2rem;
          margin-bottom: .75rem;

          a {
            color: $white;
          }
        }

        li {
          display: flex;
          margin-bottom: .5rem;

          .label {
            color: $gray-600;
            width: 100px;
            margin: 0;
          }

          .value {
            flex-grow: 1;
          }
        }

        .user-button,
        .ua-input {
          appearance: none;
          background: $gray-800;
          border: 0;
          color: inherit;
          border-radius: .5rem;
        }

        .user-button {
          cursor: pointer;

          &:hover {
            background: $gray-700;
          }
        }

        .ua-input {
          width: 100%;
        }
      }

      &-preview {
        img {
          width: 100%;
          border-radius: .5rem;
        }
      }

      &.deleted {
        opacity: .5;

        .title {
          text-decoration: line-through;
        }
      }
    }
  }

  .pagination {
    button {
      appearance: none;
      font-size: 1.5rem;
      background: transparent;
      border: 0;
      color: inherit;
      cursor: pointer;
    }
  }
</style>
