import { useEffect, useState } from "react"
import { callCreate, callUpdate, callView } from "./apicall"
import { useNavigate, useParams } from "react-router-dom"

export const InStock = () => {
    const nav = useNavigate()
    const{edit} = useParams()
    const[action,setAction]=useState("")
    const loadOneCar = async() => {
        const everything = await callView()
        setFormData(everything.filter((obj)=>{
            return obj.regno===edit
        })[0])
    }
    useEffect(()=>{
        if(edit){
            loadOneCar()
            setAction("Update")
        }
        else{
            setAction("Place")
        }
    },[])
    const[formData,setFormData] = useState({
        "regno":"",
        "model":"",
        "brand":"",
        "price":0,
        "color":""
    })

    const collect = (eve) => {
        const{name,value} = eve.target
        setFormData((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    const contactCreate = async() => {
        try{
            await callCreate(formData)
        }catch(err){
            alert(`${err} unauthorized`)
        }
        nav("/")
    }
    const contactUpdate = async() => {
        try{
            await callUpdate(formData)
        }catch(err){
            alert(`${err} unauthorized`)
        }
        nav("/")
    }

    return(
        <>
            {
                (edit)?
                <input type="text" onChange={collect} value={formData.regno} name="regno" readOnly placeholder="Registration Numebr" />
                :
                <input type="text" onChange={collect} value={formData.regno} name="regno" placeholder="Registration Numebr" />
            }
            <input type="text" onChange={collect} value={formData.brand} name="brand" placeholder="Car Brand" />
            <input type="text" onChange={collect} value={formData.model} name="model" placeholder="Car Model" />
            <input type="text" onChange={collect} value={formData.color} name="color" placeholder="Color of the car" />
            <input type="text" onChange={collect} value={formData.price} name="price" placeholder="Cost" />
            <button onClick={()=>{
                if(edit)
                    contactUpdate()
                else
                    contactCreate()
            }}>{action}</button>
        </>
    )
}