import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";

export const UserDashboard = () => {

    //States
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPack, setUserPack] = useState('');

    //Nav
    const nav = useNavigate();

    //Nav to Home
    function navToHome()
    {
        nav("/");
    }

    //Get User Data
    async function getData()
    {
        let em = getCookie("em");
        const {data,errors} = await supabase
            .from("users")
            .select()
            .eq("user_email", em);

        setUserName(data[0].user_name);
        setUserEmail(data[0].user_email);
        setUserPack(data[0].user_pack);
    }

    useEffect(()=>{
        getData().then();
    },[])

    //Logout
    function logout()
    {
        document.cookie = "em=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        nav("/");
    }

    //Get Cookie
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
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

    //Check Cookie
    function checkCookie() {
        let em = getCookie("em");
        if (em === "") {
            nav("/");
        }
    }


    //Check if Logged in
    useEffect(()=>{
        checkCookie();
    },[]);


    //Nav to packages
    function navToPack()
    {
        nav("/packages");
    }

    //Set Body Overflow Auto at load
    useEffect(()=>{
        let body = document.getElementsByTagName("body")[0];
        body.style.overflowY = "auto";
    },[])


    return (
        <>
            <div className="userDashboard-container">
                <img src="assets/images/bg_blob_orchid.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-bottom animate-blob-opacity"/>
                <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-top animate-blob-opacity-2"/>
                <div className="userDashboard">
                    <div className="userDashboard-topBar">
                        <div className="topBar-leftSection-container" onClick={navToHome}>
                            <i className="fa-solid fa-arrow-left"/><span>Back to Home</span>
                        </div>
                        <div className="topBar-rightSection-container">
                            <button className="btn btn-outline-light" onClick={logout}>Logout</button>
                        </div>
                    </div>
                    <div className="userDashboard-userProfile-container">
                        <div className="userProfile-left-container">
                            <div className="userProfile-userName">{userName}</div>
                            <div className="userProfile-userEmail"><i className="fa-solid fa-envelope text-light"/>{userEmail}</div>
                        </div>
                        <div className="userProfile-right-container">
                            <div className="userProfile-Package">
                                {
                                    !userPack &&
                                    <button className="btn btn-outline-light" onClick={navToPack}>Buy Pack</button>
                                }
                                {
                                    userPack &&
                                    <span>{userPack}</span>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="userDashboard-workout-container">
                        <div className="workout-header-container">
                            <span>WORKOUT</span>
                        </div>
                        <div className="workout-optionGrid-container">
                            <div className="workout-option-item">
                                <div className="workout-item-icon"><i className="fa-solid fa-dumbbell"/></div>
                                <div className="workout-item-text">View Workouts</div>
                            </div>
                            <div className="workout-option-item">
                                <div className="workout-item-icon"><i className="fa-solid fa-plus"/></div>
                                <div className="workout-item-text">Create Workouts</div>
                            </div>
                        </div>
                    </div>
                    <div className="userDashboard-profileOption-container">
                        <div className="profileOption-header-container">
                            <span>Profile Options</span>
                        </div>
                        <div className="profileOption-optionGrid-container">
                            <div className="profile-option-item">
                                <div className="profile-item-icon"><i className="fa-solid fa-pen-to-square"/></div>
                                <div className="profile-item-text">Change Password</div>
                            </div>
                            <div className="profile-option-item">
                                <div className="profile-item-icon"><i className="fa-solid fa-lock"/></div>
                                <div className="profile-item-text">Forgot Password</div>
                            </div>
                            <div className="profile-option-item">
                                <div className="profile-item-icon"><i className="fa-solid fa-trash"/></div>
                                <div className="profile-item-text">Delete Account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}