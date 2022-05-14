import React, { useState } from 'react';
import axios from "axios"
// import CryptoJS from "crypto-js/aes" 

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
        await axios.get(`https://dry-shore-19751.herokuapp.com/postofficeuser/${username}/${password}/${postofficename}`)
            .then((r) => {
                console.log(r.data)
                if (r.data.accountexists){                    
                    window.location.href = window.location.origin + "/home"

                    localStorage.setItem("username", username)
                    localStorage.setItem("password", password)
                    localStorage.setItem("postofficename", postofficename)
                }
            })
    }

    // const encryptWithAES = (text: any) => {
    //     const passphrase = '123';
    //     return CryptoJS.AES.encrypt(text, passphrase).toString();
    // };

    // const decryptWithAES = (ciphertext: any) => {
    //     const passphrase = '123';
    //     const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    //     const originalText = bytes.toString(CryptoJS.enc.Utf8);
    //     return originalText;
    // };

    // const handlesaveaccont = () => {
    //     // localStorage.setItem("username", username)
    //     // localStorage.setItem("password", password)
    //     // localStorage.setItem("postofficename", postofficename)

    //     console.log(encryptWithAES("hi"))
    // }

    return <div>
        <input placeholder='post office name' onChange={handleupdatepostofficename}/><br/>
        <input placeholder='username' onChange={handleupdateusername}/><br/>
        <input placeholder='password' onChange={handleupdatepassword}/><br/>
        {/* <button onClick={handlesaveaccont}>save account</button>
        <button>do not show this again</button> */}
        <button onClick={handleconfirmlogin}>Confirm</button>
    </div>
}

export default Login