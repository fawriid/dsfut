import React, { useState } from "react";
import { MD5 } from "crypto-js";
import axios from "axios";
import styles from "../styles/Main3.module.css";

const Main3 = () => {
    const [player, setPlayer] = useState();
    const [minBuy, setMinBuy] = useState();
    const [maxBuy, setMaxBuy] = useState();
    const [takeAfter, setTakeAfter] = useState();

    const partner_id = "39190";
    const secret_key = "dbc52c17ffd1f43615b3c5125d8ed3eb";

    // var cancelled = false;
    const [cancelled, setCancelled] = useState(false);

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

        if (minBuy && maxBuy && takeAfter) {
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
        } else if (
            (minBuy && maxBuy && !takeAfter) ||
            (minBuy && !maxBuy && takeAfter) ||
            (!minBuy && maxBuy && takeAfter) ||
            (minBuy && !maxBuy && !takeAfter) ||
            (!minBuy && !maxBuy && takeAfter) ||
            (!minBuy && maxBuy && !takeAfter)
        ) {
            alert("Please fill out all the inputs");
            return;
        } else if (!minBuy && !maxBuy && !takeAfter) {
            axios
                .get(
                    `https://dsfut.net/api/22/ps/${partner_id}/${timestamp}/${signature()}`
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
        }

        if (!cancelled) {
            // release control, so that handlers can be called, and continue in 10ms
            setTimeout(longRunningFunction, 1100);
        }
    }

    return (
        <div>
            <input
                value={minBuy}
                onChange={(eve) => setMinBuy(eve.target.value)}
                placeholder="minBuy..."
                type="text"
            />
            <br />
            <br />
            <input
                value={maxBuy}
                onChange={(eve) => setMaxBuy(eve.target.value)}
                placeholder="maxBuy..."
                type="text"
            />
            <br />
            <br />
            <input
                value={takeAfter}
                onChange={(eve) => setTakeAfter(eve.target.value)}
                placeholder="takeAfter..."
                type="text"
            />
            <br />
            <br />
            <br />
            <button
                className={styles.btn}
                onClick={() => {
                    setCancelled(false);
                    longRunningFunction();
                }}>
                Start!
            </button>
            <br />
            <br />
            <br />
            <button className={styles.btn} onClick={() => setCancelled(true)}>
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
