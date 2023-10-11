import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import vue3Cookies from 'vue3-cookies'


const app = createApp(App)

app.use(router)
console.log('Google Client ID:', process.env.VUE_APP_GOOGLE_CLIENT_ID)
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})
app.use(vue3Cookies, {
    expireTimes: '1d',
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'None'
})

app.mount('#app')



