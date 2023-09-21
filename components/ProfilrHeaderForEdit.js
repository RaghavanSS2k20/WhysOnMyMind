import { useState } from "react";


const BioinputStyle = {
    fontWeight: '600',
    color: '#747678',
    fontSize: '40%',
    padding:'1%',
    border: 'none', // Remove borders
    outline: 'none', // Remove outline when focused
    background: 'transparent', // Make the background transparent
  };
  const inputStyle = {
    fontWeight: 800,
      fontSize: '5vh',
      display: 'flex',
      flexDirection: 'column', // Apply common text styles
    border: '1px solid #ccc', // Thin and elegant border
    padding: '1%', // Add padding to make it more elegant
    borderRadius: '4px',
    color:'black',
    width:'fitContent' // Add rounded corners for a nicer look
  };
  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out',
  };
  const ProfileHeaderForEdit = (props)=> {
    const [hovered, setHovered] = useState(false)
    const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
      const [profileName, setProfileName]=useState(props.userData.profileName || props.userData.email)
      const [bio, setBio] = useState(props.userData.bio || "content creator,.. Being hooman")
      const handleBioInputChange = (event)=>{
        console.log("hooda")
        setBio(event.target.defaultValue)
      }
      const handleProfileNameInputChange = (event) =>{
    
        setProfileName(event.target.value)
        
    
      }
    //   console.log("The env iuns : ",process.env.backendUrl)
      const handleSaveSubmit = async ()=>{
        const uri = process.env.backendUrl+'api/user/save/general'
        const response = await fetch(uri,{
            credentials:'include',
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                profileName:profileName,
                bio:bio
            })
        })
        if(response.ok){
            console.log("ok")
            
        }
        

      }
 
    return(
  
    <div style={{display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'space-between', padding:'2%'}}>
          <div style={{ fontWeight:800, fontSize:'5vh', display:'flex', flexDirection:'column'}}>
            {
              props.userData.profileName?(
                
                <input style={inputStyle} id="profile-name" placeholder="pofileNameHere@please" defaultValue={props.profileName} onChange={handleProfileNameInputChange}></input>
  
              ):(
                <p>{props.userData.email}</p>
  
  
              )
            }
            <input style={BioinputStyle} id="bio-input" placeholder="Hort bio here ..." onChange={handleBioInputChange} defaultValue="content creator, being human">
            </input>         
            
          </div>
          <div>
            <div  style={{padding:'2%',  display:'flex',flexDirection:'column',alignItems:'center', margin:'2%', cursor:'pointer'}}>
             <button
              
              style={{
                ...buttonStyle,
                ...(hovered && {boxShadow: props.hovered ? '0px 0px 10px rgba(255, 255, 255, 0.5)' : 'none',}), // Apply hoverStyle when hovered
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSaveSubmit}
          
             >
              save
  
             </button>
            </div>
  
          </div>
  
        </div>
    )
  
    
            }
  export default ProfileHeaderForEdit