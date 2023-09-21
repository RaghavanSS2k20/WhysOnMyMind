import React from 'react';
import { Button,Tab,Tabs , Divider, InputGroup} from '@blueprintjs/core';
import styles from './styles/profile.module.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import MarkdownWithOverlay from '@/utils/MdWithOverlay';
import TabGroup from './Tabs';
import { useState } from 'react';
import Post from './Post';
import ProfileHeaderForEdit from './ProfilrHeaderForEdit';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import the CSS module
import contentpagestyles from '../styles/postpage.module.css'
import profilestyles from '../styles/profile.module.css'
import NavBar from './Navbar';
import { EditSVGComponent, HamburgerSVGComponent } from '@/assets/icons/profilepageicons';
const Posts = ({allPosts})=>(
  <>
  <div className={styles.posts}>
  {allPosts.map((post) => (
        <Post key={post._id} post={post}  isPostPinned={post.isPinned} isPostLikedByUser = {post.isLikedByUser}/>
      ))}



  </div>
  </>
)
const Story = ({story})=>(
  <div className={contentpagestyles.contentcontainer}>
    <MarkdownWithOverlay markdownContent={story}/>

  </div>
)
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
const ProfileHeader = (props)=> (
  <div style={{display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'space-between', padding:'2%'}}>
        <div style={{ fontWeight:800, fontSize:'5vh', display:'flex', flexDirection:'column'}}>
          {
            props.userData.profileName?(
              <p>{props.userData.profileName}</p>
             

            ):(
              <p>{props.userData.email}</p>


            )
          }
          <span style={{fontWeight:'600', color:'#747678', fontSize:'40%'}}>Content creator, Being human</span>          
          
        </div>
        <div>
          <div onClick={props.handleClick} style={{padding:'2%',  display:'flex',flexDirection:'column',alignItems:'center', margin:'2%', cursor:'pointer'}}>
          {props.isMe?(
              <EditSVGComponent w="30px" h="30px" />
              
            ):(
              
              <HamburgerSVGComponent w="30px" h="30px"/>
              
            )
            }
          </div>

        </div>

      </div>

  
)
const buttonStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease-in-out',
};



function Profile(props) {
  const [test, setTest] = useState(true)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const [profileName, setProfileName]=useState(props.userData.profileName || props.userData.email)
  
  const handleProfileNameInputChange = (event) =>{
    
    setProfileName(event.target.value)
    

  }
console.log(profileName)
  let types = [
    {
      title: 'Post',
      content: <Posts allPosts={props.postedPosts}/>
      // content:<p>Chshhshhs</p>,
    },
    {
      title: 'About',
      content: <p>Credit Card content goes here.</p>,
    },
    
  ];
 
  const handleClick = ()=>{
    setTest(false)
  }
  const handleClick2 = ()=>{
    console.log("hsuiakjfbskjbdfkjsbdf")
  }
  
  const isMe = true

  return (
    <>
    
    <div className={contentpagestyles.pagecontainer} >

      <div className={contentpagestyles.contentcontainer} >
          {
            props.isMe?(
            test ?(
              <ProfileHeader {...props} isMe={true} handleClick= {handleClick} />
            ):(
              <ProfileHeaderForEdit 
              {...props} 
              handleClick= {handleClick} 
              handleChangeProfileInput = {handleProfileNameInputChange} 
              profileName={profileName}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave = {handleMouseLeave}
            hovered={hovered}
              />
            )):(
              <ProfileHeader {...props} handleClick= {handleClick2} />


            )
          }

      <div>
          <Divider></Divider>
          <>{test}</>

          <div >
            <TabGroup types={types}/>
            
        </div>

        </div>

      </div>
    </div>
    </>
    

   
  );
}

export default Profile;
