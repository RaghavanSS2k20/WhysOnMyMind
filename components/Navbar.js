import { Navbar, Alignment, Button, Popover, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import "normalize.css";
import { useEffect, useState } from "react";
import utilStyle from '../styles/utils.module.css'
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { useRouter } from "next/router";

const NavBar = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userEmail, SetuserEmail] = useState('')
    const router = useRouter()
const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const HandleLogout= async ()=>{
    try{
      const response = await fetch("http://localhost:8088/logout",{
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
        const resposne = await fetch("http://localhost:8088/getuser",{credentials:'include'});
        const data = await resposne.json()
        if(data){
          console.log(data.user)
          SetuserEmail(data.user.email)

        }

      }catch(e){
        console.log('error in fetching data',e)
      }

    };
    fetchUser()
  },[])

    
    return(
    <Navbar style={{zIndex:100}}>
        <Navbar.Group align={Alignment.LEFT} >
            <Navbar.Heading className={utilStyle.headingXl}>Why'sOnMyMind</Navbar.Heading>
            <Navbar.Divider />
           
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Popover
      content={
        <Menu>
          <MenuItem   text={userEmail}className={utilStyle.menuheading}></MenuItem>
          <MenuItem icon="manually-entered-data"  text="write" />
          <MenuItem icon="manual" text="Read" />
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
    </Popover>
            

        </Navbar.Group>
    </Navbar>
    )
}
export default NavBar