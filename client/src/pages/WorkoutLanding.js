import {Navbar} from "../components/Navbar";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import supabase from "../config/supabaseClient";
import {Footer} from "../components/Footer";
import {ScrollTop} from "../components/ScrollTop";

export const WorkoutLanding = () => {

    //Navigator
    const nav = useNavigate();

    //Workout ID
    const id = useLocation().state;
    console.log(id);

    //States
    const [exId, setExId] = useState([]);
    const [idBool, setIdBool] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [wName, setWName] = useState('');

    //Get Workout Name
    async function getWName()
    {
        const {data} = await supabase.from("workouts").select().eq("id",id);
        setWName(data[0].workout_name);
    }

    //Get Exercise ID
    async function getExerciseId()
    {
        const {data} = await supabase.from("workout_exercise").select("exercise_id").eq("workout_id", id);
        data.map(x=>{
            exId.push(x.exercise_id);
        })
        setIdBool(true);
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

    //Get Exercises
    function getExercises()
    {
        exId.map(async x=>{
            const {data} = await supabase.from("exercises").select().eq("id",x);
            setExercises(current => [...current, data[0]]);
        })
        console.log(exercises);
    }

    //Calling Exercise ID Function
    useEffect(()=>{
        getExerciseId().then();
        getWName().then();
    },[])

    //Get Exercises
    useEffect(()=>{
        getExercises();
    },[idBool])

    //Check for login
    useEffect(()=>{
        //Check if user is logged in
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        //Check if user is logged in
        if(getCookie("em").length === 0)
        {
            alertHead.classList.add("error");
            alertHead.classList.remove("success");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = "Please login to access this page...";
            toggleAlert(0);
            setTimeout(() => {
                toggleAlert(1);
                setTimeout(()=>{
                    nav("/");
                },100)
            }, 4000)
        }
    },[])

    //Nav to exercises
    function navToEx()
    {
        nav("/exercises")
    }

    //Remove Exercise from workout
    async function removeEx(eid,name)
    {
        console.log(id);
        console.log(eid);
        console.log(name);
        const {errors} = await supabase.from("workout_exercise").delete().eq("workout_id",id).eq("exercise_id",eid);
        document.getElementById(eid).style.display = "none";
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];
        alertHead.classList.add("success");
        alertHead.classList.remove("error");
        alertHead.innerHTML = "Removed";
        alertContent.innerHTML = `"${name}" has been removed`;
        toggleAlert(0);
        setTimeout(() => {
            toggleAlert(1);
        }, 4000)

    }


    return (
        <>
            <div className="workout-land">
                <ScrollTop/>
                <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-bottom animate-blob-opacity"/>
                <img src="assets/images/bg_blob_dark_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-top animate-blob-opacity-2"/>
                <div className="workout-land-topBar">
                    <Navbar/>
                </div>
                <div className="workout-land-container">
                    <div className="workout-land-header">
                        <span>Workout: {wName}</span>
                        <button className="btn btn-outline-light" onClick={navToEx}>Add Exercise</button>
                    </div>
                    <div className="workout-exercise-grid">
                        {
                            exercises.length!==0 &&
                            exercises.map(((value, index) => {
                                return (
                                    <div className="exercise-item" key={index} id={value.id}>
                                        <div className="exercise-gif">
                                            <img src={value.gifUrl} alt={value.name}/>
                                        </div>
                                        <div className="exercise-content">
                                            <div className="exercise-name">{value.name}</div>
                                            <div className="exercise-target"><span className="main-color">Target: </span>{value.target}</div>
                                            <div className="exercise-equipment"><span className="main-color">Equipment: </span>{value.equipment}</div>
                                        </div>
                                        <div className="exercise-add-btn">
                                            <button onClick={() => {
                                                removeEx(value.id, value.name)
                                            }}><i className="fa-solid fa-minus"/></button>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                        {
                            exercises.length === 0 &&
                            <span className="noExercise">No Exercises Found...</span>
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