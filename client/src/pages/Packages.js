import {Navbar} from "../components/Navbar";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import axios from "axios";
import {Footer} from "../components/Footer";

export const Packages = () => {
    //States
    const [activePlan, setActivePlan] = useState('elite');
    const [cookieMail, setCookieMail] = useState('');
    const [userName, setUserName] = useState('');

    //Cookie Getter
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //Check login during startup
    const checkLogin = async () => {
        setCookieMail(getCookie("em"));
        if (cookieMail !== "") {
            const {data} = await supabase
                .from("users")
                .select()
                .eq("user_email", cookieMail)
            console.log(data);
            if (data.length !== 0) {
                setUserName(data[0].user_name);
            } else {
                setCookieMail("");
            }
        }
    }

    useEffect(() => {
        checkLogin().then();
    }, [cookieMail]);

    //Toggle Alert
    function toggleAlert(x) {
        let alert = document.getElementById("alertPop");

        if (x === 0) {
            alert.classList.add("isActive");
        } else {
            alert.classList.remove("isActive");
        }
    }

    //Buy Pack
    async function buyPack(packId) {

        if (cookieMail.length !== 0) {
            const {key} = await axios.get("http://localhost:3000/get-api-key");

            axios.post("http://localhost:3000/checkout-session", {
                packId,
                cookieMail
            }).then((res) => {
                setActivePlan(res.data.name);
                const options = {
                    key: key,
                    amount: res.data.order.amount,
                    currency: "INR",
                    name: "ArmorElite Gym",
                    description: `Subscription Pack: ${res.data.name}`,
                    image: "https://raw.githubusercontent.com/HemantDutta/ArmorElite-Gym-App/main/client/public/assets/images/armorEliteLogoSlimTrans.png?token=GHSAT0AAAAAACC2GYX33HNWBTCHKQS4IOSSZD5SBHA",
                    order_id: res.data.order.id,
                    callback_url: "http://localhost:3000/payment-success",
                    prefill: {
                        "name": userName,
                        "email": cookieMail,
                        "contact": "9999999999"
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#101010"
                    }
                };
                const razor = new window.Razorpay(options);
                razor.open();
            });
        } else {
            let alertHead = document.getElementsByClassName("alert-header-text")[0];
            let alertContent = document.getElementsByClassName("alert-pop-content")[0];
            alertHead.classList.remove("success");
            alertHead.classList.add("error");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = "Please login to buy a subscription";
            toggleAlert(0);
        }
    }

    //setActPlan function
    function setActPlan(x) {
        setActivePlan(x);
        document.querySelectorAll(".package-class").forEach(ele => {
            if (ele.id === x) {
                ele.classList.add("isActive");
            } else {
                ele.classList.remove("isActive");
            }
        })
    }

    return (
        <>
            <div className="package-page">
                <Navbar/>
                <div className="packages">
                    <img src="assets/images/bg_blob_orchid.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-2 position-absolute"/>
                    <img src="assets/images/bg_blob_dark_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity-1 position-absolute"/>
                    <div className="packages-container">
                        <div className="packages-header">
                            <span className="d-block">Packages</span>
                            <span>Start your journey towards the <div className="main-color d-inline">Elite</div> lifestyle, with us.</span>
                        </div>
                        <div className="packages-content">
                            <div className="packages-content-left">
                                <span className="package-class" id="starter" onClick={(e) => {
                                    setActPlan(e.target.id)
                                }}>Starter</span>
                                <span className="package-class" id="basic" onClick={(e) => {
                                    setActPlan(e.target.id)
                                }}>Basic</span>
                                <span className="package-class isActive" id="elite" onClick={(e) => {
                                    setActPlan(e.target.id)
                                }}>Elite</span>
                            </div>
                            <div className="packages-content-right">
                                {
                                    activePlan === "elite" &&
                                    <div className="package-card">
                                        <div className="package-card-header">
                                            <span>Elite Plan</span>
                                        </div>
                                        <div className="package-card-price">
                                            <span><div className="main-color d-inline">&#8377;</div>14999</span>
                                        </div>
                                        <div className="package-card-amenities">
                                            <span><i className="fa-solid fa-calendar"/> 12 Month + 1 Month Gym Access</span>
                                            <span><i className="fa-solid fa-user-plus"/> Personal Trainer</span>
                                            <span><i className="fa-solid fa-shower"/> Sauna Access</span>
                                            <span><i className="fa-solid fa-wifi"/> Unlimited Wifi</span>
                                            <span><i className="fa-solid fa-xmark"/> Crossfit</span>
                                        </div>
                                        <div className="package-card-buy">
                                            <button className="btn btn-light" onClick={() => {
                                                buyPack(3)
                                            }}>BUY
                                            </button>
                                        </div>
                                    </div>
                                }
                                {
                                    activePlan === "basic" &&
                                    <div className="package-card">
                                        <div className="package-card-header">
                                            <span>Basic Plan</span>
                                        </div>
                                        <div className="package-card-price">
                                            <span><div className="main-color d-inline">&#8377;</div>8999</span>
                                        </div>
                                        <div className="package-card-amenities">
                                            <span><i className="fa-solid fa-calendar"/> 6 Month + 1 Month Gym Access</span>
                                            <span><i className="fa-solid fa-user-plus"/> General Trainer</span>
                                            <span><i className="fa-solid fa-shower"/> Sauna Access</span>
                                            <span><i className="fa-solid fa-wifi"/> Unlimited Wifi</span>
                                            <span><i className="fa-solid fa-xmark"/> Crossfit</span>
                                        </div>
                                        <div className="package-card-buy">
                                            <button className="btn btn-light" onClick={() => {
                                                buyPack(2)
                                            }}>BUY
                                            </button>
                                        </div>
                                    </div>
                                }
                                {
                                    activePlan === "starter" &&
                                    <div className="package-card">
                                        <div className="package-card-header">
                                            <span>Starter Plan</span>
                                        </div>
                                        <div className="package-card-price">
                                            <span><div className="main-color d-inline">&#8377;</div>3999</span>
                                        </div>
                                        <div className="package-card-amenities">
                                            <span><i className="fa-solid fa-calendar"/> 1 Month Gym Access</span>
                                            <span><i className="fa-solid fa-user-plus"/> General Trainer</span>
                                            <span><i className="fa-solid fa-shower"/> Shower Access</span>
                                            <span><i className="fa-solid fa-wifi"/> 45 Minutes/day Wifi</span>
                                            <span><i className="fa-solid fa-xmark"/> Crossfit</span>
                                        </div>
                                        <div className="package-card-buy">
                                            <button className="btn btn-light" onClick={() => {
                                                buyPack(1)
                                            }}>BUY
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}