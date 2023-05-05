export const UserDashboard = () => {
    return (
        <>
            <div className="userDashboard-container">
                <div className="userDashboard">
                    <div className="userDashboard-topBar">
                        <div className="topBar-leftSection-container">
                            <span><i className="fa-solid fa-arrow-left"></i>Back to Home</span>
                        </div>
                        <div className="topBar-rightSection-container">
                            <button>Logout</button>
                        </div>
                    </div>
                    <div className="userDashboard-userProfile-container">
                        <div className="userProfile-left-container">
                            <div className="userProfile-userName">Hemant Dutta</div>
                            <div className="userProfile-userEmail">hemant@gmail.com</div>
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
                        <div className="workout-optionGrid-container"></div>
                    </div>
                    <div className="userDashboard-profileOption-container">
                        <div className="profileOption-header-container">
                            <span>Profile Options</span>
                        </div>
                        <div className="profileOption-optionGrid-container"></div>
                    </div>
                </div>
            </div>
        </>
    )
}