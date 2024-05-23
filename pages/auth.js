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
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const combinedClasses = classNames(utilStyles.heading3Xl, AuthStyles.heading)
    const handleEmailchange = (event)=>{
        const emailValue = event.target.value;
        setEmail(emailValue);
        const isDisabled = emailValue.trim() === '';
        console.log("isDisabled : ", isDisabled)
       setIsSubmitDisabled(isDisabled)
        // setIsSubmitDisabled(emailValue.trim() === '' || password.trim() === ''); // Update disabled status
        if(emailValue.trim() === ''){
            setError("Heyy! Double check the email")
        }else{
            setError("")
        }
    }
    const handlePasswordChange = (event)=>{
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        // setIsSubmitDisabled(email.trim() === '' || passwordValue.trim() === ''); // Update disabled status
        const isDisabled = passwordValue.trim() === '';
        console.log("isDisabled password : ", isDisabled)
       setIsSubmitDisabled(isDisabled)
        if( passwordValue.trim() === ''){
            setError("Woahh, Empty password  cannot be a password")
        }
        else{
            setError("")
        }
    };
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
                console.log("ok?",response.ok)
                if(response.ok){
                    router.back()
                }
                else if(response.status == 401){
                    setError("Credentials failed to match")
                }
                else{
                    setError("login failed try again later ")
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
                                    <button className={AuthStyles.button} type="submit" onClick={navigate} disabled={isSubmitDisabled}> {loading ? "Loading..." : "Proceed"}</button>
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
                                     <input type="password" id="password" name="password" placeholder="Your New Password" onChange={handlePasswordChange} disabled={isSubmitDisabled}/>
                                     <div className={AuthStyles["button-group"]}>
                                     <div className={AuthStyles.notyoubutton} onClick={resetForm}> Change email?</div>
                                     <button className={AuthStyles.button} type="submit" onClick={handleAuthClick} disabled={isSubmitDisabled}> {loading ? "Loading..." : "Signup"}</button>
                                     </div>
                                     </div>
                                     
                                     </>
                                    
                                    
                                ):(
                                    <>
                                    <div className={AuthStyles.formGroup}> {/* Replace styles with AuthStyles */}
                                    <p style={{color:'red'}}>{error}</p>
                                        <h1 className={utilStyles.headingMd}>Welcome Back {email}</h1>
                                        <input type="password" id="password" name="password" placeholder="Your Password" onChange={handlePasswordChange} />
                                        <div className={AuthStyles["button-group"]}>   
                                        <div className={AuthStyles.notyoubutton} onClick={resetForm}> Not You?</div>                       
                                        <button type="submit" className={AuthStyles.button} onClick={handleAuthClick}> {loading ? "Loading..." : "Login"}</button>
                                        </div>
                                        </div>
                                       
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