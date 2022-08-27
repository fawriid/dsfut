import React, { useState } from "react";
import { MD5 } from "crypto-js";
import axios from "axios";
import styles from "../styles/Main3.module.css";
import MessageTone from "../music/MessageTone.mp3";

const Main4 = () => {
    const [player, setPlayer] = useState();
    const [minBuy, setMinBuy] = useState();
    const [maxBuy, setMaxBuy] = useState();
    const [takeAfter, setTakeAfter] = useState();

    const partner_id = "39451";
    const secret_key = "0f6ed1e8d4e031f01e97b9b377801d33";

    const ringtone = new Audio(MessageTone);

    var cancelled = true;
    // var [cancelled, setCancelled] = useState(false);

    function catchingPlayer() {
        if (cancelled) {
            return;
        }

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
                        console.log(res.data.error + " A 4");
                    } else {
                        console.log(res.data.player);
                        ringtone.play();
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
                        console.log(res.data.error + " A 4");
                    } else {
                        console.log(res.data.player);
                        setPlayer(res.data.player);
                        cancelled = true;
                    }
                });
        }

        if (true) {
            setTimeout(catchingPlayer, 1000);
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <div className={styles.parametersSec}>
                    <div className={styles.inputs}>
                        <input
                            value={minBuy}
                            onChange={(eve) => setMinBuy(eve.target.value)}
                            placeholder="minBuy..."
                            type="text"
                        />
                        <input
                            value={maxBuy}
                            onChange={(eve) => setMaxBuy(eve.target.value)}
                            placeholder="maxBuy..."
                            type="text"
                        />
                        <input
                            value={takeAfter}
                            onChange={(eve) => setTakeAfter(eve.target.value)}
                            placeholder="takeAfter..."
                            type="text"
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                if (!cancelled) {
                                    return;
                                }
                                cancelled = false;
                                catchingPlayer();
                            }}>
                            Start!
                        </button>
                        <button
                            className={styles.btn}
                            onClick={() => (cancelled = true)}>
                            Stop!
                        </button>
                    </div>
                </div>
                {player && (
                    <div className={styles.playerSection}>
                        <div className={styles.playerSectionDetail}>
                            <h4>Player Name:</h4>
                            <h5>{player.name}</h5>
                        </div>
                        <div className={styles.playerSectionDetail}>
                            <h4>Start Price:</h4>
                            <h5>{player.startPrice}</h5>
                        </div>
                        <div className={styles.playerSectionDetail}>
                            <h4>Buy Now Price:</h4>
                            <h5>{player.buyNowPrice}</h5>
                        </div>
                        <div className={styles.playerSectionDetail}>
                            <h4>Player Rating:</h4>
                            <h5>{player.rating}</h5>
                        </div>
                        <div className={styles.playerSectionDetail}>
                            <h4>Player Position:</h4>
                            <h5>{player.position}</h5>
                        </div>
                        <div className={styles.playerSectionDetail}>
                            <h4>Transaction ID:</h4>
                            <h5>{player.transactionID}</h5>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main4;
