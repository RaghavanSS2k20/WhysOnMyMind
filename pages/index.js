import Edit from "./write";
import { Button } from "@blueprintjs/core";
import LandingPageStyles from '../styles/Landingpage.module.css'
import TypingAnimation from "../components/TypingAnimation";
import CleanSVG from '../assets/icons/clean.svg'
import CleanSVGComponent from "@/assets/icons/Clean";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
export default function HomePage(){
    const router = useRouter()

    return(
        <>
        <NextSeo
            title="WhyOnM - while it can be here?"
            description="WhyOnM.com: A Place to Share Your Thoughts. Don't carry the burden of your ideas alone. Join us, express your 'Whys,' and connect with others. It's where ideas come to life and curiosity speaks."
        />
        <div className={LandingPageStyles.container}>
            <div className={LandingPageStyles.content}>
                <div className={LandingPageStyles.herocontainer}>
                    <div className={LandingPageStyles.herotext}>
                        <TypingAnimation text="WhyOnM" speed={80}/>
                    </div>
                    <div className={LandingPageStyles.subherotext}>
                        <p><span style={{fontWeight:'bold'}}>WhyIsItOnMyMind</span> While it can be here?</p>
                    </div>
                </div>

            </div>
        </div>
        </>
    )

}