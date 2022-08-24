import React, { useState } from "react";
import axios from "axios";
import { MD5 } from "crypto-js";

const Main = () => {


    const btnStyle = {
        padding: "5px 15px",
                    backgroundColor: "skyblue",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
    }


    const partner_id = "39190";
    const secret_key = "dbc52c17ffd1f43615b3c5125d8ed3eb";

    
    const start = () => {
        const interval = setInterval(() => {
            function unixTimestamp() {
                return Math.floor(Date.now() / 1000);
            }
            const timestamp = unixTimestamp() ;
            
            function signature() {
                const hash = MD5(
                    partner_id + secret_key + timestamp
                    ).toString();
                    return hash;
                }
                
                axios
                .get(
                    `https://dsfut.net/api/22/ps/${partner_id}/${timestamp}/${signature()}`
                    )
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data.error)
                        }else{
                            console.log(res.data.player)
                        }
                    });
                    
                    clearInterval(setInterval)           
                    
                }, 1200);
        }
                

    return (
        <>
            <button
            onClick={()=>start()}
                style={btnStyle}>
                Start!
            </button>
            <br />
            <br />
            <br />
            <button
                style={btnStyle}>
                End!
            </button>
        </>
    );
};

export default Main;
