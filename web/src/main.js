import './assets/_index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRotate, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Add Font Awesome icons
library.add(faRotate, faPause, faPlay)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
