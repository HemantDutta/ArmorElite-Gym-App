import {Navbar} from "../components/Navbar";

export const PublicHome = () => {

    //Hero Functions
    setInterval(changeHero, 5000);
    function changeHero()
    {
        let currID;
        let hI1 = document.getElementById("hI1");
        let hI2 = document.getElementById("hI2");
        let hI3 = document.getElementById("hI3");
        let hI4 = document.getElementById("hI4");

        if(hI1.classList.contains("hero-img-active"))
        {
            hI1.classList.remove("hero-img-active");
            currID = "hI2";
        }
        if(hI2.classList.contains("hero-img-active"))
        {
            hI2.classList.remove("hero-img-active");
            currID = "hI3";
        }
        if(hI3.classList.contains("hero-img-active"))
        {
            hI3.classList.remove("hero-img-active");
            currID = "hI4";
        }
        if(hI4.classList.contains("hero-img-active"))
        {
            hI4.classList.remove("hero-img-active");
            currID = "hI1";
        }

        document.getElementById(currID).classList.add("hero-img-active");
    }

    return (
        <>
            <div className="home-container">
                {/*  Header  */}
                <Navbar/>
                {/*  Header End  */}
                {/*  Hero */}
                <div className="hero" id="hero">
                    <div className="hero-container">
                        <div className="hero-slide-container hero-img-1 hero-img-active" id="hI1">
                            <img src="assets/images/hero_img_1.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-2" id="hI2">
                            <img src="assets/images/hero_img_2.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-3" id="hI3">
                            <img src="assets/images/hero_img_3.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-slide-container hero-img-4" id="hI4">
                            <img src="assets/images/hero_img_4.jpg" alt="hero-slide"/>
                        </div>
                        <div className="hero-overlay-container"/>
                        <div className="hero-text-container">
                            <div className="hero-text-header">
                                <span>Unleash Your Being</span>
                            </div>
                            <div className="hero-text-description">
                                <span>Transform Yourself Into The</span><span>Greatest Version Of Yourself</span>
                            </div>
                            <div className="hero-text-button my-4">
                                <button>Become Elite</button>
                            </div>
                            <div className="hero-text-icon">
                                <img src="assets/images/scrollDown.png" alt="Scroll Down"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Hero End */}
            </div>
        </>
    )
}