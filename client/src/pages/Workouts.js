import {Navbar} from "../components/Navbar";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import {Link, useNavigate} from "react-router-dom";
import {Footer} from "../components/Footer";
import {ScrollTop} from "../components/ScrollTop";

export const Workouts = () => {

    //Navigator
    const nav = useNavigate();

    //States
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [userId, setUserId] = useState(0);
    const [workouts, setWorkouts] = useState([]);

    //React-hook-form
    const {register, handleSubmit, formState: {errors}} = useForm()

    //Open Create Workout
    function toggleWorkout() {
        let overlay = document.getElementById("workoutOverlay");
        let workCont = document.getElementById("workoutCont");

        overlay.classList.remove("d-none");
        workCont.classList.remove("d-none");
        setTimeout(() => {
            overlay.classList.add("isActive");
            workCont.classList.add("isActive");
        }, 100)
    }

    //Close Create workout
    function closeCreate() {
        let overlay = document.getElementById("workoutOverlay");
        let workCont = document.getElementById("workoutCont");

        overlay.classList.remove("isActive");
        workCont.classList.remove("isActive");
        setTimeout(() => {
            overlay.classList.add("d-none");
            workCont.classList.add("d-none");
        }, 100)
    }

    //Toggle Alert
    function toggleAlert(x) {
        let alert = document.getElementById("alertPop");

        if (x === 0) {
            alert.classList.add("isActive");
        } else {
            alert.classList.remove("isActive");
        }
    }

    //Get Workouts
    async function getWorkouts() {
        //Check if user is logged in
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        //Check if user is logged in
        if (getCookie("em").length === 0) {
            alertHead.classList.add("error");
            alertHead.classList.remove("success");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = "Please login to see your workouts...";
            toggleAlert(0);
            setTimeout(() => {
                toggleAlert(1);
                setTimeout(() => {
                    nav("/");
                }, 100)
            }, 4000)
        } else {
            const {data} = await supabase.from("workouts").select().eq("user_id", userId);
            setWorkouts(data);
        }
    }

    //Create Workout
    async function createWorkout() {
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];
        const {status, errors} = await supabase.from("workouts").insert({workout_name: name, workout_des: des, user_id: userId})
        if (status === 201) {
            alertHead.classList.remove("error");
            alertHead.classList.add("success");
            alertHead.innerHTML = "Success";
            alertContent.innerHTML = "Workout Added";
            document.getElementById("workoutForm").reset();
            setName('');
            setDes('');
            toggleAlert(0);
            getWorkouts().then();
            setTimeout(() => {
                toggleAlert(1);
            }, 4000)
            closeCreate();
        } else if (status >= 400) {
            alertHead.classList.remove("success");
            alertHead.classList.add("error");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = `${errors}`;
            toggleAlert(0);
            setTimeout(() => {
                toggleAlert(1);
            }, 4000)
        }
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

    //Get User Id
    async function getUserId() {
        const {data} = await supabase.from("users").select().eq("user_email", getCookie("em"));
        setUserId(data[0].user_id);
    }

    //Get ID
    useEffect(() => {
        getUserId().then();
    }, [])

    //Get Workouts
    useEffect(() => {
        getWorkouts().then()
    }, [userId])


    return (
        <>
            <div className="workouts">
                <ScrollTop/>
                <img src="assets/images/bg_blob_orchid.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity"/>
                <img src="assets/images/bg_blob_violet.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity-2"/>

                {/*Create New Workout*/}
                <div className="create-workout-overlay d-none" id="workoutOverlay" onClick={closeCreate}/>
                <div className="create-workout-container d-none" id="workoutCont">
                    <div className="create-workout-header">
                        <span>Create Workout</span>
                    </div>
                    <div className="create-workout-form">
                        <form id="workoutForm" onSubmit={handleSubmit(createWorkout)}>
                            <div className="row">
                                <div className="workout-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="workName">Workout Name</label>
                                    <input {...register("workName", {required: "Please fill this..."})} id="workName" name="workName" className="mt-2" type="text" placeholder="Enter your full name here..." onChange={(e) => setName(e.target.value)}/>
                                    <span>{errors.workName?.message}</span>
                                </div>
                                <div className="workout-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="description">Workout Description</label>
                                    <textarea {...register("description", {maxLength: {value: 120, message: "Character Limit Exceeded(120 Characters)"}})} id="description" name="description" className="mt-2" placeholder="Enter Description(optional)..." onChange={(e) => setDes(e.target.value)}/>
                                    <span>{errors.description?.message}</span>
                                </div>
                                <div className="workout-inputGroup col-lg-12 d-flex flex-column mt-5">
                                    <button type="submit" className="btn btn-outline-light">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/*Create New Workout End*/}
                <div className="workout-topBar">
                    <Navbar/>
                </div>
                <div className="workout-container">
                    <div className="workout-header">
                        <span>Workouts</span>
                        <button className="btn btn-outline-light" onClick={toggleWorkout}>Create <i className="fa-solid fa-plus"/></button>
                    </div>
                    <div className="workout-grid">
                        {
                            workouts.length === 0 &&
                            <span className="noWorkout-message">No Workouts Found...</span>
                        }
                        {
                            workouts &&
                            workouts.map(((value, index) => {
                                return (
                                    <div className="workout-item" key={index}>
                                        <div className="workout-name"><span>{value.workout_name}</span></div>
                                        <div className="workout-des"><span>{value.workout_des}</span></div>
                                        <div className="workout-more"><Link to={"/workout-landing"} state={value.id}>Open Workout</Link> <i className="fa-solid fa-arrow-right"/></div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                </div>
                {/*  Footer  */}
                <Footer/>
                {/*  Footer End  */}
            </div>
        </>
    )
}