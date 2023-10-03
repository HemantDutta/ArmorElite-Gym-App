import {Link} from "react-router-dom";

export const Footer = () =>{
    return(
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-logo">
                        <img src="assets/images/armorEliteLogoSlimTrans.png" alt="Logo"/>
                    </div>
                    <div className="footer-links">
                        <div className="footer-links-top">
                            <Link to={"/packages"}>Packages</Link>
                            <Link to={"/exercises"}>Exercises</Link>
                            <Link to={"/workouts"}>Workouts</Link>
                            <Link to={"/about"}>About</Link>
                        </div>
                        <div className="footer-links-bottom">
                            <span>Designed & Developed by: <a href="https://github.com/HemantDutta" target="_blank"><i className="fa-brands fa-github"/> Hemant Dutta</a></span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}