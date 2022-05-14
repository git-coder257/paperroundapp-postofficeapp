import { useState, useEffect, FC } from "react";
import axios from 'axios'
import "./home.css"

const handlegetdeliveraccountsfromserver = async () => {
    let deliverusers = await (await axios.get(`https://dry-shore-19751.herokuapp.com/deliverusers/${localStorage.getItem("postofficename")}`)).data
    
    if (deliverusers.success) return deliverusers.users

    return []
}

const handlegetnewdeliveraccountsfromserver = async () => {
    let newdeliveraccounts = await (await axios.get(`https://dry-shore-19751.herokuapp.com/newdeliverusers/${localStorage.getItem("postofficename")}`)).data
    
    if (newdeliveraccounts.success) return newdeliveraccounts.users

    return []
}

const handlegetorderingaccountsfromserver = async () => {
    let ordererusers = await (await axios.get(`https://dry-shore-19751.herokuapp.com/ordererusers/${localStorage.getItem("postofficename")}`)).data
    
    // if (ordererusers.success) return ordererusers.users

    return [{username: "orson"}, {username: "orson2"}, {username: "orson3"}]
}

const handleallowaccount = async (userid: number) => {
    let success = await (await axios.post(`https://dry-shore-19751.herokuapp.com/confirmdeliveraccount/${userid}`)).data

    return await success
}

interface deliveraccount {
    user_id: number,
    postoffice_id: number,
    username: string,
    password: string,
    userconfirmed: boolean
}

interface ordereruser {
    // id: number,
    // postoffice_id: number,
    username: string;
    // password: string;
    // locations: string;
    // houselocationlong: number;
    // houselocationlat: number
}

// enum

const Home: FC = () => {

    let [deliveraccounts, setdeliveraccounts] = useState<deliveraccount[]>([])
    let [newdeliveraccounts, setnewdeliveraccounts] = useState<deliveraccount[]>([])
    let [orderingaccounts, setorderingaccounts] = useState<ordereruser[]>([])
    let [popup, setpopup] = useState(false)
    let [popupuser, setpopupuser] = useState<any>({})

    useEffect(() => {

        (async function () {

            console.log(await handlegetnewdeliveraccountsfromserver())
            setnewdeliveraccounts(await handlegetnewdeliveraccountsfromserver())

            console.log(await handlegetdeliveraccountsfromserver())
            setdeliveraccounts(await handlegetdeliveraccountsfromserver())

            console.log(await handlegetorderingaccountsfromserver())
            setorderingaccounts(await handlegetorderingaccountsfromserver())
        })()
    }, [])
    

    return <>
        {!popup && <div className="parentcontainer">
            <div className="deliveraccountsparentcontainer">
                {deliveraccounts.map((deliveraccount: deliveraccount, index: number) => <div key={index} className="deliveraccountschildcontainer">
                    <button onClick={() => {
                        setpopupuser(deliveraccount)
                        setpopup(true)
                    }} className="deliveraccountsbtn">{deliveraccount.username}</button>
                </div>)}
            </div>
            <div className="newdeliveraccountsparentcontainer">
                {newdeliveraccounts.map((newdeliveraccount: deliveraccount, index: number) => <div key={index} className="newdeliveraccountschildcontainer">
                <button onClick={() => {
                    setpopupuser(newdeliveraccount)
                    setpopup(true)
                }} className="newdeliveraccounts">{newdeliveraccount.username}</button>
                </div>)}
            </div>
            <div className="orderingaccountsparentcontainer">
                {orderingaccounts.map((orderingaccount: ordereruser, index: number) => <div key={index} className="orderingaccountschildcontainer">
                    <button onClick={() => {
                        setpopupuser(orderingaccount)
                        setpopup(true)
                    }} className="orderingaccounts">{orderingaccount.username}</button>
                </div>)}
            </div>
        </div>}
        {popup && <div className="parentcontainerforpopup">
            <div className="childcontainerforpopup">
                <div className="childcontainerforpopupbackbtn">
                    <button onClick={() => {
                        setpopup(false)
                    }}>back</button>
                </div>
                <div className="childcontainerforpopupinfo">
                    {popupuser.username}
                    {typeof popupuser.userconfirmed !== "undefined" && !popupuser.userconfirmed && <button onClick={() => {
                        handleallowaccount(popupuser.user_id)
                    }}>
                        allow account
                    </button>}
                </div>
            </div>
        </div>}
    </>
}

export default Home