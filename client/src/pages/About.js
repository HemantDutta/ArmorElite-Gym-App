import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useLayoutEffect, useRef} from "react";
import {ScrollTop} from "../components/ScrollTop";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {

    //Refs
    const aboutText = useRef();
    const aboutDes = useRef();
    const aboutGrid = useRef();

    //Animations
    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.from(".about-anim", {
                y: "100",
                ease: "power1.inOut",
                duration: "0.8",
                opacity: "0",
                stagger: "0.2"
            });
        }, aboutText);
        return () => ctx.revert();
    }, [])

    //About Description
    useLayoutEffect(()=>{
        const ctx = gsap.context((self)=>{
            gsap.from(".description-container",{
                opacity: "0",
                duration: "1",
               scrollTrigger: {
                   trigger: ".description-container",
               }
            });
        }, aboutDes)
        return () => ctx.revert();
    },[])

    //Grid Text
    useLayoutEffect(()=>{
        const ctx = gsap.context((self)=>{
            gsap.from(".grid-text-anim",{
                opacity: "0",
                y: "100",
                duration: "0.8",
                stagger: "0.2",
                scrollTrigger: {
                    trigger: ".grid-text-anim",
                }
            });
        }, aboutGrid)
        return () => ctx.revert();
    },[])

    //Grid item
    useLayoutEffect(()=>{
        const ctx = gsap.context((self)=>{
            gsap.from(".about-grid-item",{
                opacity: "0",
                y: "100",
                duration: "1",
                stagger: "0.2",
                scrollTrigger: {
                    trigger: ".about-grid-item",
                }
            });
        }, aboutGrid)
        return () => ctx.revert();
    },[])


    return (
        <>
            <div className="about">
                <ScrollTop/>
                <img src="assets/images/bg_blob_blue.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-left bg-blob-top animate-blob-opacity position-absolute"/>
                <img src="assets/images/bg_blob_orchid.png" alt="Cool, huh?" className="bg-blob-abs bg-blob-right bg-blob-bottom animate-blob-opacity position-absolute"/>
                {/*  Navbar  */}
                <Navbar/>
                {/*  Navbar End  */}
                <div className="about-container">
                    <div className="about__landing">
                        <div className="about__landing__text" ref={aboutText}>
                            <span className="top-text"><span className="about-anim d-inline-block">We Are</span></span>
                            <span className="bottom-text"><span className="about-anim d-inline-block">Armor <span className="about-anim d-inline-block">Elite</span></span></span>
                        </div>
                    </div>
                    <div className="about-description" ref={aboutDes}>
                        <div className="description-container d-inline-block">
                            <div className="description-text">
                                Welcome to Armor Elite, a realm of unparalleled fitness excellence that inspires individuals to transcend their limits and achieve their maximum potential. Our noble pursuit is to empower our esteemed members with the requisite tools and guidance to attain their fitness goals through a holistic approach to training and nutrition. We firmly believe that each individual possesses the inherent capacity to become stronger, healthier, and more confident, and our royal edict is to furnish them with the resources and encouragement necessary to manifest that potential.
                            </div>
                        </div>
                    </div>
                    <div className="about-grid-container" ref={aboutGrid}>
                        <div className="about-grid-text">
                            <span className="grid-text-anim d-inline-block">Our</span> <span className="grid-text-anim d-inline-block">Focus</span>
                        </div>
                        <div className="about-grid">
                            <div className="about-grid-item">
                                <span>Strength</span>
                            </div>
                            <div className="about-grid-item">
                                <span>Discipline</span>
                            </div>
                            <div className="about-grid-item">
                                <span>Stoicism</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Footer  */}
                <Footer/>
                {/*  Footer End  */}
            </div>
        </>
    )
}