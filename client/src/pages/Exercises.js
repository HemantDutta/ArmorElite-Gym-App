import axios from "axios";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import {Navbar} from "../components/Navbar";

export const Exercises = () => {

    //states
    const [name, setName] = useState('');
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
                console.log(name);
                setExercises([]);
                const {data , errors} = await supabase.from("exercises").select().or(`bodyPart.like.%${name}%,equipment.like.%${name}%,name.like.%${name}%,target.like.%${name}%`)
                setExercises(data);
            } else {
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
                        <div className="exercise-grid-container">
                            <div className="exercise-grid-header">
                                {
                                    exercises.length === 0 &&
                                    <span>No results found...</span>
                                }
                                {
                                    exercises.length !== 0 &&
                                    <span>{exercises.length} results found...</span>
                                }
                            </div>
                            <div className="exercise-grid">
                                <div className="exercise-item">
                                    <div className="exercise-gif"></div>
                                    <div className="exercise-content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
