import axios from "axios";
import {useEffect, useState} from "react";
import {Navbar} from "../components/Navbar";

export const Exercises = () => {

    //states
    const [name, setName] = useState('');

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
            if(name.match(/^[a-zA-Z {1}]{1,15}$/g))
            {
                console.log(name);
                const options = {
                    method: 'GET',
                    url: `https://exercisedb.p.rapidapi.com/exercises/name/${name}`,
                    headers: {
                        'X-RapidAPI-Key': '86cef1b198mshf81c79b973c9488p1b2cc2jsn91f06dae0c9e',
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            else {
                alertHead.classList.add("error");
                alertHead.classList.remove("success");
                alertHead.innerHTML = "Error";
                alertContent.innerHTML = "Please enter a valid term...";
                toggleAlert(0);
                setTimeout(()=>{
                    toggleAlert(1);
                },4000)
            }
        } else {
            alertHead.classList.add("error");
            alertHead.classList.remove("success");
            alertHead.innerHTML = "Error";
            alertContent.innerHTML = "Please enter something...";
            toggleAlert(0);
            setTimeout(()=>{
                toggleAlert(1);
            },4000)
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
                            <input type="text" name="exercise" id="exercise" placeholder="Search by muscle name..." onChange={(e) => {
                                setName(e.target.value)
                            }} onKeyDown={handleKeyDown}/>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
