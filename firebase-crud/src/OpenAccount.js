import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";

const OpenAccount = () => {
    const myCollection = 'savings'
    const[account,setAccount] = useState({
        accountNo:0,accountHolder:"",accountBal:0.0,status:true
    })

    const collectForm = (eve) =>{
        const{name,value} = eve.target
        setAccount((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    // reset field inputs
    const reset = () =>{
        setAccount({
            accountNo:0,
            accountHolder:"",
            accountBal:0.0,
            status:true
        })
    }

    // on click to send colleted account to firestore
    const sendToStore = async() =>{
        const data = await addDoc(collection(db,myCollection),account)
        if(data){
            reset()
            alert("document inserted")
        }
        window.location.assign("/")
    }

    return(
        <>
            <div>
                <input type="text" onChange={collectForm} name="accountNo" placeholder="Enter the account Numebr" value={account.accountNo} />
                <input type="text" onChange={collectForm} name="accountHolder" placeholder="Enter the account Holder" value={account.accountHolder} />
                <input type="text" onChange={collectForm} name="accountBal" placeholder="Enter the account Balance" value={account.accountBal} />
                <button onClick={sendToStore}>Open New Account</button>
                <button onClick={reset}>Cancel</button>
            </div>
        </>
    )
}

export default OpenAccount;