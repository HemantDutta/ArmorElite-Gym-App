import {Navbar} from "../components/Navbar";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import supabase from "../config/supabaseClient";

export const WorkoutLanding = () => {

    //Workout ID
    const id = useLocation().state;
    console.log(id);

    //States
    const [exId, setExId] = useState([]);
    const [idBool, setIdBool] = useState(false);
    const [exercises, setExercises] = useState([]);

    //Get Exercise ID
    async function getExerciseId()
    {
        const {data} = await supabase.from("workout_exercise").select("exercise_id").eq("workout_id", id);
        data.map(x=>{
            exId.push(x.exercise_id);
        })
        setIdBool(true);
    }

    //Get Exercises
    function getExercises()
    {
        exId.map(async x=>{
            const {data} = await supabase.from("exercises").select().eq("id",x);
            exercises.push(data[0]);
        })
        console.log(exercises);
    }

    //Calling Exercise ID Function
    useEffect(()=>{
        getExerciseId().then();
    },[])

    //Get Exercises
    useEffect(()=>{
        getExercises();
    },[idBool])

    return (
        <>
            <div className="workout-land">
                <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-bottom animate-blob-opacity"/>
                <img src="assets/images/bg_blob_dark_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-top animate-blob-opacity-2"/>
                <div className="workout-land-topBar">
                    <Navbar/>
                </div>
                <div className="workout-land-container">
                    <div className="workout-land-header">
                        <span>Workout Name</span>
                        <button className="btn btn-outline-light">Add More</button>
                    </div>
                    <div className="workout-exercise-grid">
                        {
                            exercises.map(((value, index) => {
                                return (
                                    <div className="exercise-item" key={index}>
                                        <div className="exercise-gif">
                                            <img src={value.gifUrl} alt={value.name}/>
                                        </div>
                                        <div className="exercise-content">
                                            <div className="exercise-name">{value.name}</div>
                                            <div className="exercise-target"><span className="main-color">Target: </span>{value.target}</div>
                                            <div className="exercise-equipment"><span className="main-color">Equipment: </span>{value.equipment}</div>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}