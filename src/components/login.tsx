import React, { useState } from 'react';
import axios from "axios"

interface target {
    value: string
}

interface val {
    target: target
}

const Login: React.FC = () => {
    
    let [postofficename, setpostofficename] = useState("")
    let [username, setusername] = useState("")
    let [password, setpassword] = useState("")

    const handleupdatepostofficename = (val: val) => {
        setpostofficename(val.target.value)
    }

    const handleupdateusername = (val: val) => {
        setusername(val.target.value)
    }

    const handleupdatepassword = (val: val) => {
        setpassword(val.target.value)
    }

    const handleconfirmlogin = async () => {
        // await axios.get(`https://dry-shore-19751.herokuapp.com/postofficeuser/${username}/${password}/${postofficename}`)
        await axios.get(`http://localhost:3000/postofficeuser/${username}/${password}/${postofficename}`)
            .then((r) => {
                console.log(r.data)
                if (r.data.accountexists){
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
        <button onClick={handleconfirmlogin}>Confirm</button>
    </div>
}

export default Login