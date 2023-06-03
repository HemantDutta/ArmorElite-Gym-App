import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const PaymentCancel = () => {

    //Navigator
    const nav = useNavigate();

    //States
    const [timer, setTimer] = useState(5);

    if (timer < 1) {
        nav("/");
    }

    useEffect(() => {
        let redirectTimer = setInterval(() => {
            setTimer(timer - 1)
        }, 1000);
        return () => {
            clearInterval(redirectTimer)
        }
    },)
    return (
        <>
            <div className="payment-cancel-container">
                <img src="assets/images/bg_blob_pink.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity-2 position-absolute"/>
                <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity-1 position-absolute"/>
                <img src="assets/images/bg_blob_pink.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-2 position-absolute"/>
                <img src="assets/images/bg_blob_dark_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-1 position-absolute"/>

                {/*  Navbar  */}
                <Navbar/>
                {/*  Navbar End  */}
                <div className="payment-cancel-message">
                    <div className="payment-cancel-header">
                        <span>Payment Cancelled</span>
                    </div>
                    <div className="payment-cancel-content">
                        <span>Don't give up on your <div className="main-color d-inline">dream</div> physique</span>
                    </div>
                    <div className="payment-cancel-redirect">
                        <span>Redirecting in {timer} seconds...</span>
                    </div>
                </div>
                {/*  Footer  */}
                <Footer/>
                {/*  Footer End  */}
            </div>
        </>
    )
}