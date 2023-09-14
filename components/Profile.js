import React from 'react';
import { Button,Tab,Tabs , Divider} from '@blueprintjs/core';
import styles from './styles/profile.module.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import MarkdownWithOverlay from '@/utils/MdWithOverlay';
import TabGroup from './Tabs';
import Post from './Post';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import the CSS module
import contentpagestyles from '../styles/postpage.module.css'
import profilestyles from '../styles/profile.module.css'
import NavBar from './Navbar';
import { EditSVGComponent } from '@/assets/icons/profilepageicons';
const Posts = ({allPosts})=>{
  <>
  <div className={styles.posts}>
  {allPosts.map((post) => (
        <Post key={post._id} post={post}  isPostPinned={post.isPinned} isPostLikedByUser = {post.isLikedByUser}/>
      ))}



  </div>
  </>
}
const Story = ({story})=>{
  <div className={contentpagestyles.contentcontainer}>
    <MarkdownWithOverlay markdownContent={story}/>

  </div>
}
function Profile() {
  const types = [
    {
      title: 'Post',
      content: <p>Cash content goes here.</p>,
    },
    {
      title: 'About',
      content: <p>Credit Card content goes here.</p>,
    },
    
  ];

  return (
    <>
    
    <div className={contentpagestyles.pagecontainer} >

      <div className={contentpagestyles.contentcontainer} >
        <div style={{display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'space-between', padding:'2%'}}>
          <div style={{ fontWeight:800, fontSize:'5vh', display:'flex', flexDirection:'column'}}>
            <p>Raghavan M</p>
            <span style={{fontWeight:'600', color:'#747678', fontSize:'40%'}}>Content Creator, being human</span>          
            
          </div>
          <div>
            <div onClick={()=>{console.log("aii")}} style={{padding:'2%',  display:'flex',flexDirection:'column',alignItems:'center', margin:'2%', cursor:'pointer'}}>
              <EditSVGComponent w="30px" h="30px" />
            </div>

          </div>

        </div>
        <div>
          <Divider></Divider>
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
