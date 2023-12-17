import './assets/main.css'

import { createApp } from 'vue'


import App from '@/App.vue'

import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { checkAdminToken, setAuthentication } from './router/auth';
import VScrollLock from 'v-scroll-lock'

library.add(fas);
library.add(faUserLarge, faArrowUp, faMagnifyingGlass, faAngleLeft, faAngleRight, faPlus, faHeartSolid, faHeartCirclePlus, faBookmarkSolid, faBars)

createApp(App).use(router).use(VScrollLock)
const app = createApp(App);
app.use(router);
app.use(VScrollLock);


const token = ""

checkAdminToken(token).then((isAdmin) => {
  
  setAuthentication(isAdmin);
  
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.mount('#app');
});
