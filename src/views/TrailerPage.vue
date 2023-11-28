<template>
        <body>
        <header>
            <router-link to="/catalog-page">
                <div class="header-image-trailer">
                <font-awesome-icon icon="fa-solid fa-arrow-left" class="arrow-return-trailer" />
                </div>
             </router-link>
             <div v-show = false class="light">
                    <DarkLightMode></DarkLightMode>
            </div>
        </header>
       
        <div class="trailer-page">
            <div class="video-container">
                <iframe :src="link"></iframe>
            </div>
        </div>
    </body>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import DarkLightMode from "../components/DarkLightMode.vue";
import ListePage from "../components/CatalogPage/ListePage.vue";

import axios from "axios";

export default defineComponent({
  name: "TrailerPage",
  components: {
    DarkLightMode,
    ListePage,

  },
  data() {
    return {
        link : "",

    };
  },
  created() {
   
    this.link = Array.isArray(this.$route.params.link) ? this.$route.params.link[0] : this.$route.params.link || "";

  },
  computed: {


    async onMounted() {
 
    },
  },

  async mounted() {
    
  },

});
</script>
