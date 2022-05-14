import React, { useState } from 'react';

const Loginoptions: React.FC = () => {

    const handlegotologin = () => {
        window.location.href += "login"
    }

    const handlegotocreateaccount = () => {
        window.location.href += "createaccount"
    }

    return <div>
        <button onClick={handlegotologin}>login</button><br/>
        <button onClick={handlegotocreateaccount}>create account</button><br/>
        {localStorage.getItem("username") !== null && localStorage.getItem("username") !== 'null' && <button>go to previously logged in account</button>}
    </div>
}

export default Loginoptions;