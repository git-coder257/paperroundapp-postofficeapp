import React, { useState } from 'react';
import axios from 'axios'

interface target {
    value: string
}

interface val {
    target: target
}

interface address {
    city: string,
    countryName: string,
    district: string,
    houseNumber: string,
    postalCode: string,
    province: string,
    state: string,
    subdistrict: string,

}

interface quality {
    totalScore: number
}

interface geolocation {
    latitude: number,
    longitude: number
}

interface responsefromgeocodingapi {
    address: address
    formattedAddress: string,
    locationType: string,
    quality: quality,
    referencePosition: geolocation,
    roadAccessPostion: geolocation
}

const Creataccount: React.FC = () => {

    let [postofficename, setpostofficename] = useState<string>("")
    let [username, setusername] = useState<string>("")
    let [password, setpassword] = useState<string>("")
    let [district, setdistrict] = useState<string>("")
    let [listofdistricts, setlistofdistricts] = useState<string[]>([])
    let [r, setr] = useState<boolean>(true)
    let [address, setaddress] = useState<string>("")

    const handleupdatepostofficename = (val: val) => {
        setpostofficename(val.target.value)
    }

    const handleupdateusername = (val: val) => {
        setusername(val.target.value)
    }

    const handleupdatepassword = (val: val) => {
        setpassword(val.target.value)
    }

    const handleupdatedistricts = (val: val) => {
        setdistrict(val.target.value)
    }

    const handleupdateaddress = (val: val) => {
        setaddress(val.target.value)
    }

    const handleupdatelistofdistrict = () => {
        
        let listofdistrictsVar = listofdistricts

        listofdistrictsVar.push(district)

        setlistofdistricts(listofdistrictsVar)

        if (r){
            setr(false)
        } else if (!r) {
            setr(true)
        }
    }

    const handlecreateaccount = async () => {
        // await axios.post(`https://dry-shore-19751.herokuapp.com/newpostofficeuser/${username}/${password}/${postofficename}`, {

            // await axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${address}&apiKey=ZjVmOTA2NmQ5YTZkNDk0NWEzNDQzNTIxOWY0MTdlODc6ZTA5YzNjY2QtN2FjOC00NTA5LWE2NjgtYjA1NGE4Nzg1NGY1`)
            //     .then((r) => {
        //         console.log(r.data)
        //         let response: responsefromgeocodingapi[] = r.data.locations

        //         let addressexists = false
        
        //         // try {
        //         //     for (let j = 0; j < listofdistricts.length; j++){
        //         //         for (let i = 0; i < response.length; i++){
        //         //             // if(response[i].address.district !== "")
        //         //             if (response[i].address.district === listofdistricts[j]){
        //         //                 addressexists = true
        //         //                 break
        //         //             } else if (response[i].address.subdistrict === listofdistricts[j]){
        //         //                 addressexists = true
        //         //                 break
        //         //             } else if (response[i].address.city === listofdistricts[j]){
        //         //                 addressexists = true
        //         //                 break
        //         //             }
        //         //         }
        //         //     }
        //         // } catch (error) {
            
            //         // }
            //     })
            
        let requestBody: object = {
            districts: listofdistricts
        }
            
        await axios.post(`https://dry-shore-19751.herokuapp.com/newpostofficeuser/${username}/${password}/${postofficename}`, requestBody)
            .then((r) => {
                console.log(r.data)
                if (r.data.success){
                    localStorage.setItem("username", username)
                    localStorage.setItem("password", password)
                    localStorage.setItem("postofficename", postofficename)
                    
                    window.location.href = window.location.origin + "/home"
                }
            })
    }

    return <div>
        <input placeholder='post office name' onChange={handleupdatepostofficename}/><br/>
        <input placeholder='username' onChange={handleupdateusername}/><br/>
        <input placeholder='password' onChange={handleupdatepassword}/><br/>
        <input placeholder='address' onChange={handleupdateaddress}/><br/>
        <input placeholder='enter district/s' onChange={handleupdatedistricts}/><button onClick={handleupdatelistofdistrict}>confirm</button><br/>
        {listofdistricts.map((district: string, index: number) => <div key={index}>
            <span>{district}</span>
        </div>)}
        <button onClick={handlecreateaccount}>create account</button>
    </div>
}

export default Creataccount