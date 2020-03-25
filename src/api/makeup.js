import axios from 'axios'

export default axios.create({
    baseURL: "http://makeup-api.herokuapp.com/api/v1"
})