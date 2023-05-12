import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import {Navbar} from "../components/Navbar";

export const Exercises = () => {

    //states
    const [name, setName] = useState('');
    const [search, setSearch] = useState(false);
    const [exercises, setExercises] = useState([]);

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

    //Handle Key Down
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getExercises().then();
        }
    }


    return (
        <>
            <div className="exercises">
                <div className="exercises-header">
                    <Navbar/>
                </div>
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
                                                <button><i className="fa-solid fa-plus"/></button>
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
