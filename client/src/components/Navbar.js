export const Navbar = () => {
    return(
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-logo-container">
                        <img src="assets/images/armorEliteLogoSlimTrans.png" alt="ArmorElite Logo"/>
                    </div>
                    <div className="navbar-optionList-container">
                        <ul>
                            <li>Fitness</li>
                            <li>Packages</li>
                            <li>About</li>
                        </ul>
                    </div>
                    <div className="navbar-profileMenu-container">
                        <div className="navbar-login_signup-button">
                            <button className="btn btn-outline-light fw-bold">Login/Signup</button>
                        </div>
                        <div className="navbar-toggler-button">
                            <button><i className="fa-solid fa-bars"></i></button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}