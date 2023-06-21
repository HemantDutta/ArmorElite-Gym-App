import {Navbar} from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Footer} from "../components/Footer";
import axios from "axios";
import supabase from "../config/supabaseClient";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PublicHome = () => {

    const hero = useRef();


    //Animations

    //Hero-text Animation
    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.from(".hero-anim", {
                opacity: "0",
                ease: "power1",
                y: "100",
                duration: "0.4",
                delay: "0.4",
                stagger: "0.4"
            });
        }, hero);
        return () => ctx.revert();
    }, []);



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

    //Navigator
    const nav = useNavigate();

    //Navigate To Packages
    function showPackages() {
        nav("/packages");
    }

    return (
        <>
            <div className="home-container">
                {/*  Header  */}
                <Navbar/>
                {/*  Header End  */}
                {/*  Hero */}
                <div className="hero" id="hero">
                    <div className="hero-container">
                        <div className="hero-slide-container" id="hI1"/>
                        <div className="hero-overlay-container"/>
                        <div className="hero-text-container" ref={hero}>
                            <div className="hero-text-header">
                                <span className="hero-anim d-inline-block">Unleash <span className="hero-anim d-inline-block">Your</span> <span className="hero-anim d-inline-block"> Being</span></span>
                            </div>
                            <div className="hero-text-description">
                                <span className="hero-anim">Transform Yourself Into The</span><span className="hero-anim">Greatest Version Of Yourself</span>
                            </div>
                            <div className="hero-text-button hero-anim my-4">
                                <button onClick={showPackages}>Become Elite</button>
                            </div>
                            <div className="hero-text-icon hero-anim">
                                <img src="assets/images/scrollDown.png" alt="Scroll Down"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Hero End */}
                {/* About Us */}
                <div className="aboutUs">
                    <img src="assets/images/about_wave.svg" alt="wave" className="about_wave"/>
                    <div className="aboutUs-container">
                        <div className="aboutUs-left-section">
                            <div className="aboutUs-left-header">
                                <span>We are</span>
                                <span>ARMOR ELITE</span>
                            </div>
                            <div className="aboutUs-left-tag">
                                <span>Helping</span>
                                <span>Individuals</span>
                                <span>Reach</span>
                                <span>Their</span>
                                <span>Maximum</span>
                                <span>Potential</span>
                            </div>
                            <div className="aboutUs-left-Description mt-5">
                                <p>Welcome to Armor Elite, a realm of unparalleled fitness excellence that inspires individuals to <span>transcend their limits</span> and achieve their maximum potential. Our noble pursuit is to <span>empower our esteemed members</span> with the requisite tools and guidance to attain their fitness goals through a holistic approach to training and nutrition. We firmly believe that each individual possesses the inherent capacity to become <span>stronger, healthier, and more confident</span>, and our royal edict is to furnish them with the resources and encouragement necessary to manifest that potential.</p>
                            </div>
                            <div className="aboutUs-left-callToAction">
                                <button>Know More</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About Us End */}
                {/*  Facilities Section  */}
                <div className="facility">
                    <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity position-absolute"/>
                    <img src="assets/images/bg_blob_pink.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-2 position-absolute"/>
                    {/*<div className="facility-overlay"/>*/}
                    <div className="facility-mobile-header">
                        <span>WORKOUT</span>
                        <span>LIKE A PRO</span>
                    </div>
                    <div className="facility-container">
                        <div className="facility-left-sect">
                            <span>WORKOUT</span>
                        </div>
                        <div className="facility-mid-sect">
                            <div className="facility-tab-cont">
                                <div className="facility-tab fac-tab-1">
                                    <div className="facility-text">
                                        <span>State of the art equipment</span>
                                    </div>
                                </div>
                            </div>
                            <div className="facility-tab-cont">
                                <div className="facility-tab fac-tab-2">
                                    <div className="facility-text">
                                        <span>Experienced Trainers</span>
                                    </div>
                                </div>
                            </div>
                            <div className="facility-tab-cont">
                                <div className="facility-tab fac-tab-3">
                                    <div className="facility-text">
                                        <span>Thriving Community</span>
                                    </div>
                                </div>
                            </div>
                            <div className="facility-tab-cont">
                                <div className="facility-tab fac-tab-4">
                                    <div className="facility-text">
                                        <span>Spacious Gyms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="facility-right-sect">
                            <span>LIKE&nbsp;A&nbsp;PRO</span>
                        </div>
                    </div>
                </div>
                {/*Facilities Section End  */}
                {/*  Amenities Section  */}
                <div className="amenities">
                    <img src="assets/images/bg_blob_dark_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-bottom animate-blob-opacity-2 position-absolute"/>
                    <div className="amenities-container">
                        <div className="amenities-head-container">
                            <span>Amenities</span>
                            <span>At Armor Elite, we offer a comprehensive range of <div className="main-color d-inline">amenities</div> designed to cater to all your fitness needs and provide you with an exceptional workout experience.</span>
                        </div>
                        <div className="amenities-list-container">
                            <div className="amenities-item">
                                <div className="amenities-item-icon">
                                    <img src="assets/images/cardio.png" alt="Cardio"/>
                                </div>
                                <div className="amenities-item-text">
                                    <span>Cardio</span>
                                </div>
                            </div>
                            <div className="amenities-item">
                                <div className="amenities-item-icon">
                                    <img src="assets/images/wifi.png" alt="Cardio"/>
                                </div>
                                <div className="amenities-item-text">
                                    <span>Unlimited Wifi</span>
                                </div>
                            </div>
                            <div className="amenities-item">
                                <div className="amenities-item-icon">
                                    <img src="assets/images/shower.png" alt="Cardio"/>
                                </div>
                                <div className="amenities-item-text">
                                    <span>Steam & Shower</span>
                                </div>
                            </div>
                            <div className="amenities-item">
                                <div className="amenities-item-icon">
                                    <img src="assets/images/trainer.png" alt="Cardio"/>
                                </div>
                                <div className="amenities-item-text">
                                    <span>Personal Trainer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Amenities Section End  */}
                {/*  Packages Section  */}
                <div className="packages">
                    <img src="assets/images/bg_blob_orchid.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-2 position-absolute"/>
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
                {/*  Packages Section End  */}
                {/*  Footer  */}
                <Footer/>
                {/*  Footer End  */}
            </div>
        </>
    )
}