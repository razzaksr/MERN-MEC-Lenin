import { useEffect, useState } from "react"
import { callRemove, callView } from "./apicall"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const[tempCars,setTempCars]=useState([])
    const nav = useNavigate()
    const loggingOut = () => {
        localStorage.removeItem("token")
        window.location.assign("/")
    }

    const row = {
        display: "flex",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
    }
    const card = {
        display:"inline-block",
        padding:"30px",
        border:"none",
        borderRadius:"20px",
        boxShadow:"10px 10px 10px grey",
        backgroundColor:"maroon",
        color:"white"
    }

    useEffect(()=>{
        onView()
    },[])

    const onView = async() =>{
        const got = await callView()
        setTempCars(got)
    }

    const contactDelete = async(value) =>{
        await callRemove(value)
        onView()
    }

    return(
        <>
            <h1>Vehicle Dashboard</h1>
            <div style={row}>
                {
                    tempCars.map((obj)=>(
                        <div style={card}>
                            <h1>{obj.regno}</h1>
                            <h1>{obj.model}</h1>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <button onClick={()=>{
                                    nav(`/update/${obj.regno}`)
                                }}>Edit</button>
                                <button onClick={()=>{
                                    contactDelete(obj.regno)
                                }}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={loggingOut}>Logout</button>
        </>
    )
}