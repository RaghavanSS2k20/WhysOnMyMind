import AuthStyles from "../styles/authpage.module.css"
import utilStyles from "../styles/utils.module.css"
import classNames from 'classnames';
import { useState } from "react"
import { useRouter } from "next/router"
import { ButtonGroup,Button, FormGroup } from "@blueprintjs/core"
import { GoogleOAuthSVGComponent,LinkedInSVGComponent,GithubOauthSVGComponent } from "@/assets/icons/Icons"
const AuthPage = ()=>{
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPasswordSection,setShowPasswordsection] = useState(false)
    const [isSignIn,setIsSignIn] = useState(true)
    const [isNewUser, setIsNewuser] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const combinedClasses = classNames(utilStyles.heading3Xl, AuthStyles.heading)
    const handleEmailchange = (event)=>{
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setShowPasswordsection(false);
        setIsNewuser(false);
        setError('');
        setLoading(false);
    };
    const navigate = async (e)=>{
        setLoading(true)
        e.preventDefault()
        try{
            const uri = process.env.backendUrl+`api/user/get/email/${email}`
            const response = await fetch(uri,{
                credentials:'include'
            })
            if(response.status === 200){
                setShowPasswordsection(true)                
            }
            else if(response.status === 404){
                setIsNewuser(true)
                setShowPasswordsection(true)
            }
            else{
                setError('something went wrong')

            }
        }catch(er){
            setError("terribly stepped on some thing")
        }
        finally{
            setLoading(false)
        }
        
    }
    const handleAuthClick = async (event)=>{
        setLoading(true)
        event.preventDefault()
        if(isNewUser){
            try{
            const uri = process.env.backendUrl + 'register'
            const data = {
                "email":email,
                "password":password
            }
            const response = await fetch(uri,{
                credentials:'include',
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            })
            if(response.ok){
                router.back()
            }
            else{
                setError("register failed ")
            }
        }catch(err){
            setError("my dog stepped on a bee")
        }
        finally{
            setLoading(false)
        }

        }else{
            
            try{
                const uri = process.env.backendUrl + 'login'
                const data = {
                    "email":email,
                    "password":password
                }
                const response = await fetch(uri,{
                    credentials:'include',
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                })
                if(response.ok){
                    router.back()
                }
                else{
                    setError("lgin failed ")
                }
            }catch(err){
                setError("my dog stepped on a bee")
            }
            finally{
                setLoading(false)
            }

        }
    }
    return(
        <div className={AuthStyles.container}>
            <div className={AuthStyles.content}>
                <div style={{alignSelf:"center"}}>
                    <div className={combinedClasses}>
                        WhyOnM.com

                    </div>
                    <div className={utilStyles.headingLg}>
                    "Unlock the Power to 
                    Write, Explore, and <span className={AuthStyles.highlightanimate}> Highlight Your World </span>"
                    </div>
                </div>
                <div >
                    <div className={AuthStyles.loginsection}>
                        <p className={utilStyles.headingXl}>Join us</p>
                       
                        {}
                        <div className={AuthStyles.formContainer}> {/* Replace styles with AuthStyles */}
                        {!showPasswordSection?(
                            <form className={AuthStyles.loginForm}> {/* Replace styles with AuthStyles */}
                                
                                <div className={AuthStyles.formGroup}> {/* Replace styles with AuthStyles */}
                                <p style={{color:'red'}}>{error}</p>
                                    <input type="email" id="email" name="email" placeholder="Your Email" onChange={handleEmailchange} />
                                    <button className={AuthStyles.button} type="submit" onClick={navigate}> {loading ? "Loading..." : "Proceed"}</button>
                                </div>
                                {/* <div className={AuthStyles.formGroup}> 
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Your Password" />
                                </div> */}
                                
                                
                                 
                                
                            </form>
                        ):(
                             <form className={AuthStyles.loginForm}> {/* Replace styles with AuthStyles */}
                                {isNewUser?(
                                    <>
                                     <div className={AuthStyles.formGroup}> {/* Replace styles with AuthStyles */}
                                
                                     <h1 className={utilStyles.headingMd}>Welcome {email}</h1>
                                     <input type="password" id="password" name="password" placeholder="Your New Password" onChange={handlePasswordChange} />
                                     </div>
                                     <div className={AuthStyles["button-group"]}>
                                     <button className={AuthStyles.notyoubutton} onClick={resetForm}> Not You?</button>
                                     <button className={AuthStyles.button} type="submit" onClick={handleAuthClick}> {loading ? "Loading..." : "Signup"}</button>
                                     </div>
                                     </>
                                    
                                    
                                ):(
                                    <>
                                    <div className={AuthStyles.formGroup}> {/* Replace styles with AuthStyles */}
                                    <p style={{color:'red'}}>{error}</p>
                                        <h1 className={utilStyles.headingMd}>Welcome Back {email}</h1>
                                        <input type="password" id="password" name="password" placeholder="Your Password" onChange={handlePasswordChange} />
                                        </div>
                                    
                                        <button type="submit" className={AuthStyles.button} onClick={handleAuthClick}> {loading ? "Loading..." : "Login"}</button>
                                </>
                                )}
                                
                            </form>

                        )
                        }           
                         </div>
                        

                          
                                        
                    </div>
                   
                   
                </div>

            </div>
            
        </div>
        
    )

}
export default AuthPage