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

    return [{username: "orson"}, {username: "orson2"}, {username: "orson3"}]

}

const handleaddnewpaper = async (paperinfo: {papername: string, paperprice: number, days: any[]}) => {
    console.log(paperinfo)

    for (let i = 0; i < paperinfo.days.length; i++){
        axios.post(`https://dry-shore-19751.herokuapp.com/${paperinfo.papername}/${paperinfo.days[i][2]}/${localStorage.getItem("postofficename")}`)
    }

    await axios.post(`https://dry-shore-19751.herokuapp.com/${localStorage.getItem("postofficename")}/${paperinfo.papername}/${paperinfo.paperprice}`)
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

const useGetDayStates: () => (any)[] = () => {
    
    let [monday, setmonday] = useState<boolean>(false)
    let [tuesday, settuesday] = useState<boolean>(false)
    let [wednesday, setwednesday] = useState<boolean>(false)
    let [thursday, setthursday] = useState<boolean>(false)
    let [friday, setfriday] = useState<boolean>(false)
    let [saturday, setsaturday] = useState<boolean>(false)
    let [sunday, setsunday] = useState<boolean>(false)
 
    return [[monday, setmonday, "monday"], [tuesday, settuesday, "tuesday"], [wednesday, setwednesday, "wednesday"],
            [thursday, setthursday, "thursday"], [friday, setfriday, "friday"], [saturday, setsaturday, "saturday"],
            [sunday, setsunday, "sunday"]]
}

const Home: FC = () => {

    let [deliveraccounts, setdeliveraccounts] = useState<deliveraccount[]>([])
    let [newdeliveraccounts, setnewdeliveraccounts] = useState<deliveraccount[]>([])
    let [orderingaccounts, setorderingaccounts] = useState<ordereruser[]>([])
    let [popup, setpopup] = useState(false)
    let [popupuser, setpopupuser] = useState<any>({})
    let [stylesforparentcontainer, setstylesforparentcontainer] = useState<string>("")
    let [shownewpaperdisplay, setshownewpaperdisplay] = useState<boolean>(false)
    let [papername, setpapername] = useState("")
    let [paperprice, setpaperprice] = useState<number>(1)
    let daystates = useGetDayStates()

    useEffect(() => {

        (async function () {
            
            let deliveraccountsvar = await handlegetdeliveraccountsfromserver()
            let newdeliveraccountsvar = await handlegetnewdeliveraccountsfromserver()
            let orderingaccountsvar = await handlegetorderingaccountsfromserver()
            
            setdeliveraccounts(deliveraccountsvar)

            setnewdeliveraccounts(newdeliveraccountsvar)

            setorderingaccounts(orderingaccountsvar)

            if (deliveraccountsvar.length > 20 || newdeliveraccountsvar.length > 20 || orderingaccountsvar.length > 20) setstylesforparentcontainer("displayflexparentcontainer")
            else if (deliveraccountsvar.length <= 20 && newdeliveraccountsvar.length <= 20 && orderingaccountsvar.length <= 20) {setstylesforparentcontainer("normalparentcontainer")}
        })()
    }, [])
    
    const handleupdatedaystodeliver =  (state: boolean | Function, setstate: boolean | Function) => {
        if (typeof setstate !== "boolean" && typeof state !== "function"){
            setstate(!state)
        }
    }

    return <>
        {!popup && <div className={stylesforparentcontainer}>
            <div className="parentcontainerforaccountsinfo">
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
            </div>
            <div>
                {shownewpaperdisplay && <div>
                    <input onChange={(e: {target: {value: string}}) => {
                        setpapername(e.target.value)
                    }} placeholder="paper name" type="text"/><br/>
                    <input onChange={(e: {target: {value: string}}) => {
                        setpaperprice(parseFloat(e.target.value))
                    }} placeholder="price" type="text"/>
                    {daystates.map((day: any, index: number) => <div key={index}>
                        <input onChange={() => handleupdatedaystodeliver(day[0], day[1])} type="checkbox" checked={day[0]}/>{day[2]}
                    </div>)}
                    <button onClick={() => {
                        let newdays = daystates.filter((value) => {
                            return value[0]
                        })
                        handleaddnewpaper({papername: papername, paperprice: paperprice, days: newdays})
                    }}>Confirm</button>
                </div>}
                {!shownewpaperdisplay && <button onClick={() => {
                    setshownewpaperdisplay(true)
                }}>Add Paper</button>}
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
                        let popupuservar =  popupuser
                        popupuservar.userconfirmed = true

                        setpopupuser(popupuservar)
                    }}>
                        allow account
                    </button>}
                </div>
            </div>
        </div>}
    </>
}

export default Home