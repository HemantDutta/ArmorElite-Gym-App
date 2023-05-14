import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import {Navbar} from "../components/Navbar";

export const Exercises = () => {

    //states
    const [name, setName] = useState('');
    const [search, setSearch] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [userId, setUserId] = useState(0);
    const [workouts, setWorkouts] = useState([]);
    const [exId, setExId] = useState(0);

    //Toggle Alert
    function toggleAlert(x) {
        let alert = document.getElementById("alertPop");

        if (x === 0) {
            alert.classList.add("isActive");
        } else {
            alert.classList.remove("isActive");
        }
    }

    //Get Exercises
    async function getExercises() {

        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];

        if (name !== "") {
            if (name.match(/^[a-zA-Z {1}]{1,15}$/g)) {
                setSearch(true);
                setExercises([]);
                const {data, errors} = await supabase.from("exercises").select().or(`bodyPart.like.%${name}%,equipment.like.%${name}%,name.like.%${name}%,target.like.%${name}%`)
                setExercises(data);
            } else {
                setSearch(false);
                setExercises([]);
                alertHead.classList.add("error");
                alertHead.classList.remove("success");
                alertHead.innerHTML = "Error";
                alertContent.innerHTML = "Please enter a valid term...";
                toggleAlert(0);
                setTimeout(() => {
                    toggleAlert(1);
                }, 4000)
            }
        } else {
            setSearch(false);
            setExercises([]);
            alertHead.classList.add("error");
            alertHead.classList.remove("success");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = "Please enter something...";
            toggleAlert(0);
            setTimeout(() => {
                toggleAlert(1);
            }, 4000)
        }
    }

    //Get Workouts
    async function getWorkouts() {
        const {data} = await supabase.from("workouts").select().eq("user_id", userId);
        setWorkouts(data);
    }

    //Handle Key Down
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getExercises().then();
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
        getUserId().then(() => {
            getWorkouts().then()
        });
    }, [userId])

    //Toggle Alert
    function toggleAlert(x) {
        let alert = document.getElementById("alertPop");

        if (x === 0) {
            alert.classList.add("isActive");
        } else {
            alert.classList.remove("isActive");
        }
    }

    //Close Atw
    function closeAtw()
    {
        let overlay = document.getElementById("atw-overlay");
        let cont = document.getElementById("atw-cont");
        overlay.classList.remove("isActive");
        cont.classList.remove("isActive");
        setTimeout(() => {
            overlay.classList.add("d-none");
            cont.classList.add("d-none");
        }, 100);
    }

    //Add To Workout
    function addToWorkout(exId, exName) {
        setExId(exId);
        let overlay = document.getElementById("atw-overlay");
        let cont = document.getElementById("atw-cont");
        let ex = document.getElementById("atw-name");
        ex.innerText = `Adding "${exName}" to...`;
        overlay.classList.remove("d-none");
        cont.classList.remove("d-none");
        setTimeout(() => {
            overlay.classList.add("isActive");
            cont.classList.add("isActive");
        }, 100);
    }

    //Add To Workout Returns
    async function atwAdd () {
        let alertHead = document.getElementsByClassName("alert-header-text")[0];
        let alertContent = document.getElementsByClassName("alert-pop-content")[0];
        let wkId = document.getElementById("atw-list").value;
        const {errors, status} = await supabase.from("workout_exercise").insert({"workout_id": wkId, "exercise_id": exId});
        if (status === 201) {
            alertHead.classList.remove("error");
            alertHead.classList.add("success");
            alertHead.innerHTML = "Success";
            alertContent.innerHTML = "Exercise Added";
            toggleAlert(0);
            closeAtw();
            setTimeout(() => {
                toggleAlert(1);
            }, 4000)
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


    return (
        <>
            <div className="exercises">
                <div className="exercises-header">
                    <Navbar/>
                </div>
                {/*Add To Workout*/}
                <div className="atw-overlay d-none" id="atw-overlay" onClick={closeAtw}/>
                <div className="atw-container d-none" id="atw-cont">
                    <div className="atw-header">
                        <span>Add To Workout</span>
                    </div>
                    <div className="atw-content">
                        <label htmlFor="atw-list" id="atw-name">Adding Exercise</label>
                        <select name="atw-list" id="atw-list">
                            <option value="#" defaultValue>Choose a workout</option>
                            {
                                workouts.map(((value, index) => {
                                    return (
                                        <option value={value.id} key={index}>{value.workout_name}</option>
                                    )
                                }))
                            }
                        </select>
                    </div>
                    <div className="atw-button">
                        <button className="btn btn-outline-light" id="atw-button" onClick={atwAdd}>Add</button>
                    </div>
                </div>
                {/*Add To Workout End*/}
                <div className="exercises-container">
                    <div className="exercises-search-container">
                        <div className="searchBar">
                            <input type="text" name="exercise" id="exercise" placeholder="Search keyword..." onChange={(e) => {
                                setName(e.target.value)
                            }} onKeyDown={handleKeyDown}/>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </div>
                    </div>
                    <div className="search-keyword-flex">
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("biceps");
                                getExercises().then()
                            }}>Biceps
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("triceps");
                                getExercises().then()
                            }}>Triceps
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("chest");
                                getExercises().then()
                            }}>Chest
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("legs");
                                getExercises().then()
                            }}>Legs
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("shoulder");
                                getExercises().then()
                            }}>Shoulders
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("back");
                                getExercises().then()
                            }}>Back
                            </button>
                        </div>
                        <div className="search-keyword-item">
                            <button onClick={() => {
                                setName("forearm");
                                getExercises().then()
                            }}>Forearms
                            </button>
                        </div>

                    </div>
                    <div className="exercise-grid-container">
                        <div className="exercise-grid-header">
                            {
                                exercises.length === 0 && search &&
                                <span id="result">No results found...</span>
                            }
                            {
                                exercises.length === 0 && !search &&
                                <span id="result">Please enter a keyword...</span>
                            }
                            {
                                exercises.length !== 0 &&
                                <span id="result"><span className="main-color">{exercises.length}</span> results found...</span>
                            }
                        </div>
                        <div className="exercise-grid">
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
                                            <div className="exercise-add-btn">
                                                <button onClick={() => {
                                                    addToWorkout(value.id, value.name)
                                                }}><i className="fa-solid fa-plus"/></button>
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
