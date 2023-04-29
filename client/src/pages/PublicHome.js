import {Navbar} from "../components/Navbar";
import {useNavigate} from "react-router-dom";

export const PublicHome = () => {

    //Navigator
    const nav = useNavigate();

    //Hero Functions
    setInterval(changeHero, 5000);

    function changeHero() {
        let currID;
        let hI1 = document.getElementById("hI1");
        let hI2 = document.getElementById("hI2");
        let hI3 = document.getElementById("hI3");
        let hI4 = document.getElementById("hI4");

        if (hI1.classList.contains("hero-img-active")) {
            hI1.classList.remove("hero-img-active");
            currID = "hI2";
        }
        if (hI2.classList.contains("hero-img-active")) {
            hI2.classList.remove("hero-img-active");
            currID = "hI3";
        }
        if (hI3.classList.contains("hero-img-active")) {
            hI3.classList.remove("hero-img-active");
            currID = "hI4";
        }
        if (hI4.classList.contains("hero-img-active")) {
            hI4.classList.remove("hero-img-active");
            currID = "hI1";
        }

        document.getElementById(currID).classList.add("hero-img-active");
    }

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
                        <div className="hero-slide-container hero-img-1 hero-img-active" id="hI1">
                            <img src="assets/images/hero_img_1.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-2" id="hI2">
                            <img src="assets/images/hero_img_2.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-3" id="hI3">
                            <img src="assets/images/hero_img_3.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-4" id="hI4">
                            <img src="assets/images/hero_img_4.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-overlay-container"/>
                        <div className="hero-text-container">
                            <div className="hero-text-header">
                                <span>Unleash Your Being</span>
                            </div>
                            <div className="hero-text-description">
                                <span>Transform Yourself Into The</span><span>Greatest Version Of Yourself</span>
                            </div>
                            <div className="hero-text-button my-4">
                                <button onClick={showPackages}>Become Elite</button>
                            </div>
                            <div className="hero-text-icon">
                                <img src="assets/images/scrollDown.png" alt="Scroll Down"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Hero End */}
                {/* About Us */}
                <div className="aboutUs">
                    <div className="aboutUs-overlay"/>
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
            </div>
        </>
    )
}