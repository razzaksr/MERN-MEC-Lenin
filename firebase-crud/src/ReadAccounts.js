import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import OpenAccount from "./OpenAccount";

const ReadAccounts = () =>{

    const myCollection = "savings"
    // temporary list
    const[accounts,setAccounts] = useState([])
    // edit
    const[account,setAccount] = useState({
        id:"",accountNo:0,accountHolder:"",accountBal:0.0,status:true
    })
    // open
    const[acct,setAcct] = useState({
        accountNo:0,accountHolder:"",accountBal:0.0,status:true
    })
    // to show edit page or not
    const[editView,setEditView] = useState(false)
    // to show open page or not
    const[openView,setOpenView] = useState(false)

    const loadAccounts = async() =>{
        const snapshots = await getDocs(collection(db,myCollection))
        const received = snapshots.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setAccounts(received)
    }

    useEffect(()=>{
        loadAccounts()
    },[])

    const sendToStore = async() =>{
        const data = await addDoc(collection(db,myCollection),acct)
        if(data){
            reset()
            alert("document inserted")
        }
        setOpenView(false)
        window.location.assign("/")
    }

    const suspendAccount = async(primary) =>{
        const document = doc(db,myCollection,primary)
        await deleteDoc(document)
        window.location.assign("/")
    }

    const editAccount = async(primary) =>{
        const document = doc(db,myCollection,primary)
        const snapshot = await getDoc(document)
        if(snapshot.exists()){
            setAccount(snapshot.data())
            setAccount((old)=>{
                return{
                    ...old,
                    id:snapshot.id
                }
            })
            setEditView(true)
        }
    }

    const collectForm = (eve) =>{
        const{name,value} = eve.target
        setAccount((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }

    const collectAddForm = (eve) =>{
        const{name,value} = eve.target
        setAcct((old)=>{
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
    const updateStore = async() =>{
        const document = doc(db,myCollection,account.id)
        // overwirte exists document
        await setDoc(document,account)
        setEditView(false)
        window.location.assign("/")
    }

    return(
        <>
            {
                (openView)
                ?
                <>
                    <div>
                        <input type="text" onChange={collectAddForm} name="accountNo" placeholder="Enter the account Numebr" value={acct.accountNo} />
                        <input type="text" onChange={collectAddForm} name="accountHolder" placeholder="Enter the account Holder" value={acct.accountHolder} />
                        <input type="text" onChange={collectAddForm} name="accountBal" placeholder="Enter the account Balance" value={acct.accountBal} />
                        <button onClick={sendToStore}>Open New Account</button>
                        <button onClick={reset}>Cancel</button>
                    </div>
                </>
                :
                (editView)
                ?
                <>
                    <div>
                        <input type="text" readOnly name="id" value={account.id} />
                        <input type="text" onChange={collectForm} name="accountNo" placeholder="Enter the account Numebr" value={account.accountNo} />
                        <input type="text" onChange={collectForm} name="accountHolder" placeholder="Enter the account Holder" value={account.accountHolder} />
                        <input type="text" onChange={collectForm} name="accountBal" placeholder="Enter the account Balance" value={account.accountBal} />
                        <input type="text" onChange={collectForm} name="status" placeholder="Enter the account status" value={account.status} />
                        <button onClick={updateStore}>Update Account</button>
                        <button onClick={reset}>Cancel</button>
                    </div>
                </>
                :
                <>
                    <button onClick={()=>setOpenView(true)}>Open New Account</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Holder name</th>
                                <th>Account Balance</th>
                                <th>Account Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                accounts.map((doc)=>(
                                    <tr>
                                        <td>{doc.accountNo}</td>
                                        <td>{doc.accountHolder}</td>
                                        <td>{doc.accountBal}</td>
                                        <td>
                                            <button onClick={()=>{
                                                suspendAccount(doc.id)
                                            }}>Delete</button>
                                            <button onClick={()=>{
                                                editAccount(doc.id)
                                            }}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}
export default ReadAccounts;