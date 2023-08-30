import { Dialog, DialogBody,DialogFooter,Tabs,Tab, Button } from "@blueprintjs/core";
import { useRouter } from "next/router";
import AuthForm from "./Form";
import { useState,useEffect } from "react";
import axios from 'axios';

const isBrowser = typeof window !== "undefined";






const AuthOverlay = (props) =>{
    const router = useRouter()
    const [selectedTabId,setSelectedTabID]=useState('login')
    const [isOpened, setIsOpened] = useState(props.isOpen)

    const HandleLoginSubmit = (props)=>{
        const url = 'http://localhost:8088/login'
        console.log("props : ",props)
        const data={
            "email":props.email,
            "password":props.password
        }
        const options = {
            credentials: 'include',
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type as JSON
            },
           
            
            body: JSON.stringify(data) // Convert the data to JSON format
          };
          console.log(options.body)
          fetch(url, options)
          .then(response => response.json()) // Parse the response as JSON
          .then(result => {
           
            console.log('POST request successful', result);
            router.reload()
            setIsOpened(false)
            
            
            
          })
          .catch(error => {
            console.error('Error making POST request', error);
          });
        
    }
    const SignInSubmit = (props)=>{
        const url = 'http://localhost:8088/register'; // Updated URL
        const data = {
            email: props.email,
            password: props.password
        };
    
        axios.post(url, data, { withCredentials: true })
        .then(response => {
            console.log('POST request successful', response.data);
            setIsOpened(false);
            router.push('/');
        })
        .catch(error => {
            console.error('Error making POST request', error);
        });
    };

    const HandleTabChange=()=>{
        if(selectedTabId=="login"){
            setSelectedTabID('signin')
        }
        else{
           setSelectedTabID('login')
        }
    }
    
    return isBrowser?(
    <Dialog  isOpen={isOpened}  >
        <DialogBody>
            <div style={{textAlign:'center',fontFamily:" system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",fontWeight:800,fontSize:'3vh'}}>Why'sOnMyMind</div>
            <div style={{textAlign:'center'}}>Please Login to Write your ideas!</div>
        <Tabs id="TabsExample"  selectedTabId={selectedTabId} onChange={HandleTabChange}>
                <Tab id="login" title="Login" panel={
                        <AuthForm 
                            handleFunction={HandleLoginSubmit} 
                            buttonText="Login"
                            inputId = "usernameforlogin" 
                            passwordId="passwordforlogin"
                        />
                    } />
                <Tab id="signin" title="SignIn" panel={<AuthForm handleFunction={SignInSubmit} buttonText="signin"  inputId = "usernameforsignin" passwordId="passwordforsignin"/>} panelClassName="ember-panel" />
                
    
         </Tabs>
        </DialogBody>
        <DialogFooter actions={<Button intent="primary" text="Close" onClick={() => router.push('/')} />} />
    </Dialog>
    ):null
}
export default AuthOverlay;