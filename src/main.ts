import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import motion from './motion'

import 'virtual:uno.css'

const app = createApp(App)
app.directive('motion', motion)
app.mount('#app')
