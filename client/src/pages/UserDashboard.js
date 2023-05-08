import {useNavigate} from "react-router-dom";

export const UserDashboard = () => {

    //Nav
    const nav = useNavigate();

    //Nav to Home
    function navToHome()
    {
        nav("/");
    }

    return (
        <>
            <div className="userDashboard-container">
                <div className="userDashboard">
                    <div className="userDashboard-topBar">
                        <div className="topBar-leftSection-container" onClick={navToHome}>
                            <i className="fa-solid fa-arrow-left"/><span>Back to Home</span>
                        </div>
                        <div className="topBar-rightSection-container">
                            <button className="btn btn-outline-light">Logout</button>
                        </div>
                    </div>
                    <div className="userDashboard-userProfile-container">
                        <div className="userProfile-left-container">
                            <div className="userProfile-userName">Hemant Dutta</div>
                            <div className="userProfile-userEmail"><i className="fa-solid fa-envelope text-light"/>hemant@gmail.com</div>
                        </div>
                        <div className="userProfile-right-container">
                            <div className="userProfile-Package">
                                <span>ELITE</span>
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