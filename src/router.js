import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './components/LandingPage/HomePage'
import FruitList from './components/LandingPage/FruitList'
import AddNewFruit from './components/LandingPage/AddNewFruit'
import EditFruit from './components/LandingPage/EditFruit'
import SingleFruit from './components/LandingPage/SingleFruit'
import LoginPage from './components/LandingPage/LoginPage'
import MyFruits from './components/LandingPage/MyFruits'
import CharacterView from './components/LandingPage/CharacterView'
import ParameciaFruit from './components/Attributes/Types/ParameciaFruit'


const routes = [
    {
        name: 'HomePage',
        path: '/fruits',
        component: HomePage
    },
    {
        name:'FruitList',
        path: '/fruits/list',
        component: FruitList
    },
    {
        name: 'AddNewFruit',
        path: '/fruits/add',
        component: AddNewFruit
    },
    {
        name: 'EditFruit',
        path:'/fruits/update/:id',
        component: EditFruit
    },
    {
        name: 'SingleFruit',
        path: '/fruits/:id',
        component: SingleFruit,
        props: true // This allows passing route params as props to the component
    },
    {
        name: 'MyFruits',
        path: '/fruits/myfruits',
        component: MyFruits
    },
    {
        name: 'LoginPage',
        path: '/user/login',
        component: LoginPage
    },
    {
        name: 'CharacterView',
        path: '/fruits/character',
        component: CharacterView
    },
    {
        name: 'ParameciaFruit',
        path: '/fruits/type/:type',
        component: ParameciaFruit,
    }
   

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
