import {useEffect} from "react";

export const ScrollTop = () =>{

    function handleScroll(){
        if(window.scrollY>100){
            document.getElementById("scrollTop").style.opacity = "1";
        }
        else{
            document.getElementById("scrollTop").style.opacity = "0";
        }
    }

    //Scroll To Top
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)

        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[]);

    return(
        <>
            {/*to the top button*/}
            <div className="scrollToTop" id="scrollTop">
                <button onClick={()=>{window.scrollTo(0,0)}}><i className="fa-sharp fa-solid fa-arrow-up"/></button>
            </div>
            {/*to the top button End*/}
        </>
    )
}