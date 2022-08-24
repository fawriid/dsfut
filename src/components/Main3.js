import React, { useState } from "react";
import { MD5 } from "crypto-js";
import axios from "axios";
import styles from "../styles/Main3.module.css";

const Main3 = () => {
    const [player, setPlayer] = useState();
    const [minBuy, setMinBuy] = useState();
    const [maxBuy, setMaxBuy] = useState();
    const [takeAfter, setTakeAfter] = useState();

    const btnStyle = {
        padding: "5px 15px",
        backgroundColor: "skyblue",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "10px",
    };

    const partner_id = "39190";
    const secret_key = "dbc52c17ffd1f43615b3c5125d8ed3eb";

    var cancelled = false;

    function longRunningFunction() {
        // if (cancelled) {
        //     return;
        // }

        function unixTimestamp() {
            return Math.floor(Date.now() / 1000);
        }
        const timestamp = unixTimestamp();

        function signature() {
            const hash = MD5(partner_id + secret_key + timestamp).toString();
            return hash;
        }

        axios
            .get(
                `https://dsfut.net/api/22/ps/${partner_id}/${timestamp}/${signature()}?min_buy=${minBuy}&max_buy=${maxBuy}&take_after=${takeAfter}`
            )
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error);
                } else {
                    console.log(res.data.player);
                    setPlayer(res.data.player);
                    cancelled = true;
                }
            });

        if (!cancelled) {
            // release control, so that handlers can be called, and continue in 10ms
            setTimeout(longRunningFunction, 1100);
        }
    }

    return (
        <div>
            <input
                value={minBuy}
                onChange={(eve) => setMinBuy(eve.value.target)}
                placeholder="minBuy..."
            />
            <br />
            <br />
            <input
                value={maxBuy}
                onChange={(eve) => setMaxBuy(eve.value.target)}
                placeholder="maxBuy..."
            />
            <br />
            <br />
            <input
                value={takeAfter}
                onChange={(eve) => setTakeAfter(eve.value.target)}
                placeholder="takeAfter..."
            />
            <br />
            <br />
            <br />
            <button
                style={btnStyle}
                onClick={() => {
                    cancelled = false;
                    longRunningFunction();
                }}>
                Start!
            </button>
            <br />
            <br />
            <br />
            <button style={btnStyle} onClick={() => (cancelled = true)}>
                stop!
            </button>
            <br />
            <br />
            {player && (
                <div className={styles.playerSection}>
                    <p>{player.name}</p>
                    <p>{player.startPrice}</p>
                    <p>{player.buyNowPrice}</p>
                    <p>{player.rating}</p>
                    <p>{player.position}</p>
                </div>
            )}
        </div>
    );
};

export default Main3;
