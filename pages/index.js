import Edit from "./write";
import { Button } from "@blueprintjs/core";
import LandingPageStyles from '../styles/Landingpage.module.css'
import TypingAnimation from "@/utils/TypeingAnimation";
import CleanSVG from '../assets/icons/clean.svg'
import CleanSVGComponent from "@/assets/icons/Clean";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
export default function HomePage(){
    const router = useRouter()

    return(
        <>
        <NextSeo
            title="WhysOnM - Where Ideas Find Expression."
            description="WhyOnM.com: A Place to Share Your Thoughts. Don't carry the burden of your ideas alone. Join us, express your 'Whys,' and connect with others. It's where ideas come to life and curiosity speaks."
        />
        <div className={LandingPageStyles.container}>
            <div className={LandingPageStyles.herotext}>
                <span> <div className={LandingPageStyles.typing}>Why'sOnMyMind</div></span>&nbsp; <p>while  it can be here?</p>
            </div>
            <div className={LandingPageStyles.buttonContainer}>
                <button className={LandingPageStyles.writebutton} onClick={()=>{router.push('/write')}}>
                    <div><CleanSVGComponent/></div>
                        <div>Spill your mind</div>
                </button>
                <Button icon="manual" text="Read Posts" onClick={()=>{router.push('/posts')}}/>
            </div>
        </div>
        </>
    )

}