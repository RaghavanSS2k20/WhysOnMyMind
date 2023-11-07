import { Navbar, Alignment, Button, Popover, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import "normalize.css";
import { useEffect, useState } from "react";
import utilStyle from '../styles/utils.module.css'
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { useRouter } from "next/router";
import { PinBoardSVGComponent } from "@/assets/icons/Icons";

const NavBar = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userEmail, SetuserEmail] = useState('')
    const router = useRouter()
const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const HandleLogout= async ()=>{
    try{
      const response = await fetch("https://whyonm-api.onrender.com/logout",{
        credentials:'include',
        method:'DELETE'
      });
      const data = await response.json()
      if(response.ok){
        console.log('logout success')
        router.push('/')
        
        
      }else{
        console.log('request ok but code not good')
      }
      
    }catch(e){
      console.log('error is lpogout ',e)
    }

  }
  useEffect(()=>{
    const fetchUser = async ()=>{
      try{
        const resposne = await fetch("https://whyonm-api.onrender.com/getuser",{credentials:'include'});
        const data = await resposne.json()
        if(data){
         // console.log("dddddddddddadaaaaaaaaaaaaaaaaaatttttttttttttttttttttttttttttttttaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data.user)
          SetuserEmail(data.user.email)

        }

      }catch(e){
        console.log('error in fetching data',e)
      }

    };
    fetchUser()
  },[])
 
    
    return(
    <Navbar style={{zIndex:100,}}>
        <Navbar.Group align={Alignment.LEFT} >
            <Navbar.Heading className={utilStyle.headingXl}  style={{fontSize:'3vh'}}onClick={()=>{router.push("/")}}>WhyOnM</Navbar.Heading>
            
            <Navbar.Divider />
           
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            {userEmail?(<Popover
                content={
                  <Menu>
                    <MenuItem onClick={()=>{router.push('/profile/me')}}   text={userEmail}className={utilStyle.menuheading}></MenuItem>
                    <MenuItem icon="manually-entered-data"  text="write" />
                    <MenuItem icon="manual" text="Read" />
                    <MenuItem icon={<PinBoardSVGComponent size="15x"/>} text="Pin Board" onClick={()=>{router.push("/pinboard")}} />
                    <MenuDivider />
                    <MenuItem text="logout" icon="log-out" onClick={HandleLogout} className={utilStyle.menusubheading}>
                    
                    </MenuItem>
                  </Menu>
                }
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                position="bottom-right"
            >
            <Button className="bp5-minimal" icon="user" onClick={toggleMenu} />
          </Popover>):(
             <Button className="bp5-minimal" text="LOGIN" onClick={()=>{router.push("/auth")}}/>

          )}
            
                      

                  </Navbar.Group>
              </Navbar>
    )
}
export default NavBar