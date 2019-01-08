import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-35d8c.firebaseio.com/'
})

export default instance;