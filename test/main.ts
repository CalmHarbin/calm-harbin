import { createApp } from 'vue'
import App from './App.vue'
// import calmHarbin from '../src/index'
import CalmButton from '../packages/button/src/button.vue'

console.log(CalmButton)

const app = createApp(App)

// app.use(calmHarbin)

app.component(CalmButton.name, CalmButton)

app.mount('#app')
