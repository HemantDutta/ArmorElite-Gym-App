import {Navbar} from "../components/Navbar";

export const PublicHome = () => {

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
            setTimeout(()=>{
                signUpCont.classList.add("d-none");
                signInCont.classList.remove("d-none");
                setTimeout(()=>{
                    signInCont.classList.add("joinNowActive");
                },100)
            },400)
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
            setTimeout(()=>{
                signInCont.classList.add("d-none");
                signUpCont.classList.remove("d-none");
                setTimeout(()=>{
                    signUpCont.classList.add("joinNowActive");
                },100)
            },400)
        }
    }

    return (
        <>
            <div className="home-container">
                {/*  Header  */}
                <Navbar/>
                {/*  Header End  */}
                <div className="joinNow-overlay"/>
                <div className="joinNow-container">
                    <div className="joinNow-tabGroup-container">
                        <button className="button-active" id="signUp" onClick={openSignUp}>Sign Up</button>
                        <button onClick={openSignIn} id="signIn">Sign In</button>
                    </div>
                    <div className="joinNow-signUp-container joinNowActive" id="signUpCont">
                        <div className="signUp-header">
                            <span>Start Your Journey</span>
                        </div>
                        <div className="signUp-form-container">
                            <form>
                                <div className="row">
                                    <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" name="name" className="mt-2" type="text" placeholder="Enter your full name here..."/>
                                    </div>
                                    <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" name="email" className="mt-2" type="email" placeholder="Enter your email here..."/>
                                    </div>
                                    <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" name="password" className="mt-2" type="password" placeholder="Enter your password here..."/>
                                    </div>
                                    <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-5">
                                        <button className="btn btn-outline-light">Submit</button>
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
                            <form>
                                <div className="row">
                                    <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" name="name" className="mt-2" type="text" placeholder="Enter your full name here..."/>
                                    </div>
                                    <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" name="email" className="mt-2" type="email" placeholder="Enter your email here..."/>
                                    </div>
                                    <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" name="password" className="mt-2" type="password" placeholder="Enter your password here..."/>
                                    </div>
                                    <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-5">
                                        <button className="btn btn-outline-light">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}