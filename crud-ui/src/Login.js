import { useState } from "react"
import { callLogin } from "./apicall"

export const Login = () => {
    const[credential,setCredential] = useState({
        "username":"",
        "password":""
    })
    const gather = (eve) => {
        const{name,value} = eve.target
        setCredential((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    const onLogin = async() => {
        // console.log(`${credential.username} trying to login`)
        try{
            const got = await callLogin(credential)
            // console.log(got)
            localStorage.setItem('token',got.message)
            alert('login successfull')
            window.location.assign("/")
        }catch(err){
            alert(err)
        }
        setCredential(()=>{
            return{
                username:"",
                password:""
            }
        })
    }

    return(
        <>
            <input onChange={gather} value={credential.username} type="text" name="username" placeholder="enter the username"/>
            <input onChange={gather} value={credential.password} type="password" name="password" placeholder="enter the password" />
            <button onClick={onLogin}>Login</button>
        </>
    )
}