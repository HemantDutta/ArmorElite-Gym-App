import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import supabase from "../config/supabaseClient";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

export const Navbar = () => {

    //Form Validation
    const {register, handleSubmit, formState: {errors}, watch} = useForm();
    const {register: register2, handleSubmit: handle2, formState: {errors: err}, watch: watch2} = useForm();

    //States
    const [regName, setRegName] = useState('');
    const [regMail, setRegMail] = useState('');
    const [regPass, setRegPass] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cookieMail, setCookieMail] = useState('');
    const [userName, setUserName] = useState('');

    //Navigator
    const nav = useNavigate();

    //open Fitness Menu
    function openFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");
        let body = document.getElementsByTagName("body")[0];
        if (!fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.remove("d-none");
            setTimeout(() => {
                fitnessMenu.classList.add("fitnessMenu-open");
                body.style.overflowY = "hidden";
            }, 10)
        }
    }

    //Mouse Leave Fitness Menu Close
    function closeFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");
        let body = document.getElementsByTagName("body")[0];
        if (fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.remove("fitnessMenu-open");
            body.style.overflowY = "auto";
            setTimeout(() => {
                fitnessMenu.classList.add("d-none");
            }, 400)
        }
    }

    //Navigate to Exercise
    function navToEx() {
        nav("/exercises");
    }

    //Navigate to Workouts
    function navToWo() {
        nav("/workouts");
    }

    //Open Big Menu
    function openBigMenu() {
        let bigMenu = document.getElementById("bigMenu");
        let body = document.getElementsByTagName("body")[0];
        if (bigMenu.classList.contains("bigMenu-open")) {
            bigMenu.classList.remove("bigMenu-open");
            setTimeout(() => {
                bigMenu.classList.add("d-none");
                body.style.overflowY = "auto";
            }, 200)
        } else {
            bigMenu.classList.remove("d-none");
            setTimeout(() => {
                bigMenu.classList.add("bigMenu-open");
                body.style.overflowY = "hidden";
            }, 10)
        }
    }

    //Join Now Functions
    function openSignIn() {
        let signIn = document.getElementById("signIn");
        let signUp = document.getElementById("signUp");
        let signInCont = document.getElementById("signInCont");
        let signUpCont = document.getElementById("signUpCont");

        if (!signIn.classList.contains("button-active")) {
            signIn.classList.add("button-active");
            signUp.classList.remove("button-active");
            signUpCont.classList.remove("joinNowActive");
            setTimeout(() => {
                signUpCont.classList.add("d-none");
                signInCont.classList.remove("d-none");
                setTimeout(() => {
                    signInCont.classList.add("joinNowActive");
                }, 100)
            }, 400)
        }
    }

    function openSignUp() {
        let signIn = document.getElementById("signIn");
        let signUp = document.getElementById("signUp");
        let signInCont = document.getElementById("signInCont");
        let signUpCont = document.getElementById("signUpCont");

        if (!signUp.classList.contains("button-active")) {
            signUp.classList.add("button-active");
            signIn.classList.remove("button-active");
            signInCont.classList.remove("joinNowActive");
            setTimeout(() => {
                signInCont.classList.add("d-none");
                signUpCont.classList.remove("d-none");
                setTimeout(() => {
                    signUpCont.classList.add("joinNowActive");
                }, 100)
            }, 400)
        }
    }

    //Open Join Now
    function openJoinNow() {
        let bigMenu = document.getElementById("bigMenu");
        let body = document.getElementsByTagName("body")[0];
        let overlay = document.getElementById("joinNowOverlay");
        let joinNow = document.getElementById("joinNowCont");

        if (!overlay.classList.contains("overlayActive")) {
            if (bigMenu.classList.contains("bigMenu-open")) {
                bigMenu.classList.remove("bigMenu-open");
                setTimeout(() => {
                    bigMenu.classList.add("d-none");
                    overlay.classList.remove("d-none");
                    joinNow.classList.remove("d-none");
                    setTimeout(() => {
                        overlay.classList.add("overlayActive");
                        joinNow.classList.add("joinContActive");
                    }, 100);
                }, 200);
            } else {
                overlay.classList.remove("d-none");
                joinNow.classList.remove("d-none");
                body.style.overflowY = "hidden";
                setTimeout(() => {
                    overlay.classList.add("overlayActive");
                    joinNow.classList.add("joinContActive");
                }, 100);
            }
        }
    }

    //Close join Now
    function closeJoinNow() {
        let body = document.getElementsByTagName("body")[0];
        let overlay = document.getElementById("joinNowOverlay");
        let joinNow = document.getElementById("joinNowCont");

        if (overlay.classList.contains("overlayActive")) {
            joinNow.classList.remove("joinContActive");
            overlay.classList.remove("overlayActive");
            body.style.overflowY = "auto";
            setTimeout(() => {
                overlay.classList.add("d-none");
                joinNow.classList.add("d-none");
            }, 100)
        }
    }

    //Hide navbar on scroll
    let oldScrollY = window.scrollY;

    function hideNav() {
        let navbar = document.getElementById("navbarMain");
        if (window.scrollY > oldScrollY) {
            navbar.classList.add("navHide");
        } else {
            setTimeout(() => {
                navbar.classList.remove("navHide");
            }, 100);
        }
        oldScrollY = window.scrollY;
    }

    window.addEventListener("scroll", hideNav);

    //Toggle Alert
    function toggleAlert(x) {
        let alert = document.getElementById("alertPop");

        if (x === 0) {
            alert.classList.add("isActive");
        } else {
            alert.classList.remove("isActive");
        }
    }

    //User Registration
    async function registerUser() {
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        const {status, errors} = await supabase
            .from("users")
            .insert({user_name: regName, user_email: regMail, user_password: regPass})
        if (status === 201) {
            alertHead.classList.remove("error");
            alertHead.classList.add("success");
            alertHead.innerHTML = "Success";
            alertContent.innerHTML = "Registration Successful";
            toggleAlert(0);
            document.getElementById("signUpForm").reset();
            openSignIn();
        } else if (status === 409) {
            alertHead.classList.remove("success");
            alertHead.classList.add("error");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = `${errors}`;
            toggleAlert(0);
        }
    }

    //Check Mail
    async function checkMail() {
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        const {data, errors, status, statusText} = await supabase
            .from("users")
            .select()
            .eq("user_email", regMail);

        console.log(data);

        if (data.length !== 0) {
            if (data[0].user_email === regMail) {
                alertHead.classList.remove("success");
                alertHead.classList.add("error");
                alertHead.innerHTML = "Error";
                alertContent.innerHTML = "Email Already Exists";
                toggleAlert(0);
            }
        } else {
            await registerUser();
        }
    }

    //Cookie Setter
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

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


    //User Login
    function loginUser() {
        setCookie("em", email, 7);
        nav("/user-dashboard");
    }

    //Check Login Mail
    async function checkLoginMail() {

        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        const {data, errors} = await supabase
            .from("users")
            .select()
            .eq("user_email", email);

        if (data.length !== 0) {
            if (data[0].user_email === email) {
                if (data[0].user_password === pass) {
                    alertHead.innerHTML = "Success";
                    alertHead.classList.add("success");
                    alertHead.classList.remove("error");
                    alertContent.innerHTML = "Login Successful";
                    toggleAlert(0);
                    setTimeout(() => {
                        toggleAlert(1);
                        loginUser();
                    }, 1000)
                } else {
                    alertHead.innerHTML = "Error";
                    alertHead.classList.remove("success");
                    alertHead.classList.add("error");
                    alertContent.innerHTML = "Incorrect Password";
                    toggleAlert(0);
                }
            } else {
                alertHead.innerHTML = "Error";
                alertHead.classList.remove("success");
                alertHead.classList.add("error");
                alertContent.innerHTML = "Incorrect Email";
                toggleAlert(0);
            }
        } else {
            alertHead.innerHTML = "Error";
            alertHead.classList.remove("success");
            alertHead.classList.add("error");
            alertContent.innerHTML = "User not found";
            toggleAlert(0);
        }
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
                console.log(userName);
            } else {
                setCookieMail("");
                console.log("not found")
            }
        }
    }

    useEffect(() => {
        checkLogin().then();
    }, [cookieMail])

    //Move to Dashboard
    function navToDash()
    {
        nav("/user-dashboard");
    }

    //Set Body Overflow Auto at load
    useEffect(()=>{
        let body = document.getElementsByTagName("body")[0];
        body.style.overflowY = "auto";
    },[])

    return (
        <>
            {/*Navbar*/}
            <nav>
                <div className="navbar-container navActive" id="navbarMain">
                    <div className="navbar-logo-container">
                        <Link to={"/"}>
                            <img src="assets/images/fav.png" alt="Main Logo" id="mainLogo"/>
                            <img src="assets/images/armorEliteLogoSlimTrans.png" alt="ArmorElite Logo" id="armorEliteLogo"/>
                        </Link>
                    </div>
                    <div className="navbar-optionList-container">
                        <ul>
                            <li onMouseOver={openFitnessMenu}>Fitness</li>
                            <li><Link to={"/packages"}>Packages</Link></li>
                            <li><Link to={"/about"}>About</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-profileMenu-container">
                        {
                            userName !== '' &&
                            <div className="navbar-profile-menu">
                                <div className="navbar-profile-name" onClick={navToDash}><span>Hi {userName}</span><i className="fa-solid fa-arrow-right"/></div>
                            </div>
                        }
                        {
                            userName === '' &&
                            <div className="navbar-login_signup-button">
                                <button className="btn btn-outline-light" onClick={openJoinNow}>Login/Signup</button>
                            </div>
                        }

                        <div className="navbar-toggler-button">
                            <button onClick={openBigMenu}><i className="fa-solid fa-bars"/></button>
                        </div>
                    </div>
                </div>
                <div className="navbar-fitnessMenu-container shadow d-none" id="fitnessMenu" onMouseLeave={closeFitnessMenu}>
                    <div className="fitnessMenu-topText-container text-center">
                        <span className="text-light">Begin your fitness journey</span>
                    </div>
                    <div className="fitnessMenu-optionCards-container">
                        <div className="fitnessMenu-optionCard" onClick={navToEx}>
                            <div className="fitnessMenu-optionCard-topText">
                                <span>Find Exercises</span>
                            </div>
                            <div className="fitnessMenu-optionCard-icon">
                                <img src="assets/images/exercises.png" alt="Exercise Icon"/>
                            </div>
                        </div>
                        <div className="fitnessMenu-optionCard" onClick={navToWo}>
                            <div className="fitnessMenu-optionCard-topText">
                                <span>Create A Workout</span>
                            </div>
                            <div className="fitnessMenu-optionCard-icon">
                                <img src="assets/images/workouts.png" alt="Workouts Icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-bigMenu-container d-none" id="bigMenu">
                    <div className="bigMenu-innerContainer">
                        <div className="bigMenu-optionList-container">
                            <ul className="m-0 p-0">
                                <li><i className="fa-solid fa-circle"/><Link to={"/packages"}>Packages</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/exercises"}>Exercises</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/workouts"}>Workouts</Link></li>
                                {
                                    userName === '' &&
                                    <li onClick={openJoinNow}><i className="fa-solid fa-circle"/><Link to={""}>Join Now</Link></li>
                                }
                                <li><i className="fa-solid fa-circle"/><Link to={"/about"}>About</Link></li>
                            </ul>
                        </div>
                        <div className="bigMenu-logo-container">
                            <img src="assets/images/fav.png" alt="ArmorElite Logo"/>
                        </div>
                    </div>
                </div>
            </nav>
            {/*Navbar End*/}
            {/*Join Now*/}
            <div className="joinNow-overlay d-none" id="joinNowOverlay" onClick={closeJoinNow}/>
            <div className="joinNow-container d-none" id="joinNowCont">
                <div className="joinNow-logo">
                    <img src="/assets/images/armorEliteLogoSlimTrans.png" alt="Armor Elite Logo"/>
                </div>
                <div className="joinNow-tabGroup-container">
                    <button className="button-active" id="signUp" onClick={openSignUp}>Sign Up</button>
                    <button onClick={openSignIn} id="signIn">Sign In</button>
                </div>
                <div className="joinNow-signUp-container joinNowActive" id="signUpCont">
                    <div className="signUp-header">
                        <span>Start Your Journey</span>
                    </div>
                    <div className="signUp-form-container">
                        <form id="signUpForm" onSubmit={handleSubmit(checkMail)}>
                            <div className="row">
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="name">Full Name</label>
                                    <input {...register("name", {required: "Please fill this..."})} id="name" name="name" className="mt-2" type="text" placeholder="Enter your full name here..." onChange={(e) => setRegName(e.target.value)}/>
                                    <span>{errors.name?.message}</span>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="regEmail">Email</label>
                                    <input {...register("regEmail", {required: "Please fill this...", pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Please enter a valid email"}})} formNoValidate={true} id="regEmail" name="regEmail" className="mt-2" type="email" placeholder="Enter your email here..." onChange={(e) => setRegMail(e.target.value)}/>
                                    <span>{errors.regEmail?.message}</span>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="regPassword">Password</label>
                                    <input {...register("regPassword", {required: "Please fill this...", pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g, message: "Password must contain at least one letter and one number"}, minLength: {value: 8, message: "Password must be at least 8 characters"}})} id="regPassword" name="regPassword" className="mt-2" type="password" placeholder="Enter your password here..." onChange={(e) => setRegPass(e.target.value)}/>
                                    <span>{errors.regPassword?.message}</span>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-5">
                                    <button type="submit" className="btn btn-outline-light">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="joinNow-signIn-container d-none" id="signInCont">
                    <div className="signIn-header">
                        <span>Welcome Back!</span>
                    </div>
                    <div className="signIn-form-container">
                        <form id="signInForm" onSubmit={handle2(checkLoginMail)}>
                            <div className="row">
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="email">Email</label>
                                    <input {...register2("email", {required: "Please fill this...", pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Please enter a valid email"}})} id="email" name="email" className="mt-2" type="email" placeholder="Enter your email here..." onChange={(e) => setEmail(e.target.value)}/>
                                    <span>{err.email?.message}</span>
                                </div>
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="password">Password</label>
                                    <input {...register2("password", {required: "Please fill this...", minLength: {value: 8, message: "Please enter a valid password"}})} id="password" name="password" className="mt-2" type="password" placeholder="Enter your password here..." onChange={(e) => setPass(e.target.value)}/>
                                    <span>{err.password?.message}</span>
                                </div>
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-5">
                                    <button type="submit" className="btn btn-outline-light">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Join Now End*/}
            {/*  Alert PopUp  */}
            <div className="alert-pop" id="alertPop">
                <div className="alert-pop-container">
                    <div className="alert-pop-header">
                        <div className="alert-header-text">Success</div>
                        <div className="alert-header-cross" onClick={() => {
                            toggleAlert(1)
                        }}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                    <div className="alert-pop-content">Registration Successful</div>
                </div>
            </div>
            {/*  Alert PopUp End  */}
        </>
    )
}