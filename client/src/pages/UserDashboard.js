export const UserDashboard = () => {
    return (
        <>
            <div className="userDashboard-container">
                <div className="userDashboard">
                    <div className="userDashboard-topBar">
                        <div className="topBar-leftSection-container"></div>
                        <div className="topBar-rightSection-container"></div>
                    </div>
                    <div className="userDashboard-userProfile-container">
                        <div className="userProfile-left-container"></div>
                        <div className="userProfile-right-container"></div>
                    </div>
                    <div className="userDashboard-workout-container">
                        <div className="workout-header-container"></div>
                        <div className="workout-optionGrid-container"></div>
                    </div>
                    <div className="userDashboard-profileOption-container">
                        <div className="profileOption-header-container"></div>
                        <div className="profileOption-optionGrid-container"></div>
                    </div>
                </div>
            </div>
        </>
    )
}