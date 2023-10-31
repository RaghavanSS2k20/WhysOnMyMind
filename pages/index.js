import Edit from "./write";
import { Button } from "@blueprintjs/core";
import LandingPageStyles from '../styles/Landingpage.module.css'
import TypingAnimation from "../components/TypingAnimation";
import CleanSVG from '../assets/icons/clean.svg'
import CleanSVGComponent from "@/assets/icons/Clean";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState } from "react";
import RainyCanvas from "@/components/RainyCanvas";
export default function HomePage(){
    const [showSnowflakes, setShowSnowflakes] = useState(true);

    const toggleSnowflakes = () => {
      setShowSnowflakes((prevState) => !prevState);
    };
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
                    <div className={LandingPageStyles.buttonRow}> {/* Updated className to LandingPageStyles.buttonRow */}
      <Button className={LandingPageStyles.blackButton} style={{backgroundColor:'black', color:'white'}} icon="manual">Read Posts</Button> {/* Updated className to LandingPageStyles.blackButton */}
      <Button className={LandingPageStyles.borderButton} icon="clean">Spill your mind</Button> {/* Updated className to LandingPageStyles.borderButton */}
    </div>
                </div>
                

            </div>
            <div className={LandingPageStyles.bottomRightContainer}>
        <div className={LandingPageStyles.responsiveTextButton}>
         
          <Button onClick={toggleSnowflakes} className={LandingPageStyles.responsiveButton} minimal={true} icon="snowflake"> {showSnowflakes ? 'Turn off winter mode' : 'Winter is coming'}</Button>
        </div>
      </div>
        </div>
        <div className={LandingPageStyles.container}>
        <div style={{ display: showSnowflakes ? 'block' : 'none' }}>
                 <div className={LandingPageStyles.snowflake}>
    ❅
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❅
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❆
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❄
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❆
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❄
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❅
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❆
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❄
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❅
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❆
  </div>
  <div className={LandingPageStyles.snowflake}>
    ❄
  </div>
  
</div>

                    
        </div>
        
        </>
    )

}