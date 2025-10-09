import axios from "axios"

const url = "http://localhost:1234"

export const callLogin = async(object) => {
    // status code , value
    const received = await axios.post(`${url}/auth/signin`,object)
    return received.data
}
export const callView = async() => {
    const received = await axios.get(`${url}/db/`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    return received.data
}