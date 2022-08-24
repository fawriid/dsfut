import axios from "axios";
import React, { useEffect, useState } from "react";
import { MD5 } from "crypto-js";

const Main2 = () => {
    const btnStyle = {
        padding: "5px 15px",
        backgroundColor: "skyblue",
        color: "white",
        border: "none",
        cursor: "pointer",
    };

    const partner_id = "39190";
    const secret_key = "dbc52c17ffd1f43615b3c5125d8ed3eb";

    const [startInterval, setStartInterval] = useState(false);
    const [endInterval, setEndInterval] = useState(false);

    useEffect(() => {
        if(endInterval) {return}

            const interval = setInterval(() => {
                console.log(startInterval);
                // function unixTimestamp() {
                    //     return Math.floor(Date.now() / 1000);
                    // }
                    // const timestamp = unixTimestamp() ;
                    
                    // function signature() {
                        //     const hash = MD5(
                            //         partner_id + secret_key + timestamp
                            //         ).toString();
                            //         return hash;
                            //     }
                            
                            //     axios
                            //     .get(
                                //         `https://dsfut.net/api/22/ps/${partner_id}/${timestamp}/${signature()}`
                                //         )
                                //         .then((res) => {
                                    //             if (res.data.error) {
                                        //                 console.log(res.data.error)
                                        //             }else{
                                            //                 console.log(res.data.player)
                                            //             }
                                            //         });
                                            
                                            clearInterval(setInterval);
                                        }, 1200);
                                    
    });

    return (
        <>
            <button onClick={() => setStartInterval(true)} style={btnStyle}>
                Start!
            </button>
            <br />
            <br />
            <br />
            <button onClick={() => setStartInterval(false)} style={btnStyle}>
                End!
            </button>
        </>
    );
};

export default Main2;
