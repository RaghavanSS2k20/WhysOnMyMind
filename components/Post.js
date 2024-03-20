import { Card,Icon,Button, Popover, Tooltip , Classes,} from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';
import PostStyles from '../styles/allpost.module.css'
import Pin from '../assets/icons/Vector.svg'
import ReactMarkdown from 'react-markdown';
import ContentImage from '../assets/Images/contentImage.png'
 import Image from "next/image";
 import { useState,useEffect } from "react";
 import { useRouter } from "next/router";
import LikeSVGComponent from "@/assets/icons/Like";
import LinkSVGComponent from "@/assets/icons/Link";
function formatMonthAndYear(createdAt) {
  const date = new Date(createdAt);
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function truncateText(text, maxLines) {
  if(text)
  {const lines = text.split('.');
  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).join('\n') + '...';
  }
  return text;}
  return text
}

export default function Post({post, isPostPinned, isPostLikedByUser}){
  const loader = ({src})=>{
    return post.clickUpImageSrc
  
  }
  console.log("from post component : ", isPostPinned)
  const router = useRouter()

  const [isPinned, setIspinned] = useState(isPostPinned||false)
  const [isLiked, setIsLiked] = useState(isPostLikedByUser||false)
  // const [hookupImage, setHookupImage] = useState(ContentImage)
  // if(post.clickUpImageSrc){
  //   setHookupImage(post.clickUpImageSrc)
  // }
  
  const togglePin = async ()=>{
      if(!isPinned){
        console.log("post pinned")
          setIspinned(true)
        try{
            const response  = await fetch("https://whyonm-api.onrender.com/api/user/pinpost",{
                credentials:'include'
                ,method:'PATCH',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type
                  },
                  body: JSON.stringify({ postId:post._id })})
                  if(response.ok){
                    console.log("backend succes")
                  }

        }catch(e){


        }
          
      }else{
          console.log("post unpinned")
          setIspinned(false)
          try{
            const response  = await fetch("https://whyonm-api.onrender.com/api/user/unpinpost",{
                credentials:'include'
                ,method:'PATCH',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type
                  },
                  body: JSON.stringify({ postId:post._id })})
                  if(response.ok){
                    console.log("backend succes")
                  }
                  else{
                    const resp = await response.json()
                    console.log(resp.error)
                  }

        }catch(e){


        }
      }
  }
  const toggleLike = async()=>{
    if(!isLiked){
      setIsLiked(true)
      console.log('post is liked')
      try{
        const response  = await fetch("https://whyonm-api.onrender.com/api/user/like",{
            credentials:'include'
            ,method:'PATCH',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
              },
              body: JSON.stringify({ postId:post._id })})
              if(response.ok){
                console.log("backend succes")
              }

    }catch(e){


    }
    }else{
      console.log("post unlikded")
      setIsLiked(false)
      try{
        const response  = await fetch("https://whyonm-api.onrender.com/api/user/unlike",{
            credentials:'include'
            ,method:'PATCH',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
              },
              body: JSON.stringify({ postId:post._id })})
              if(response.ok){
                console.log("backend succes")
              }
              else{
                const resp = await response.json()
                console.log(resp.error)
              }

    }catch(e){


    }
  }
  }
  const getFillColor = () => {
  return isPinned ? 'black' : 'white';
};
 
    return(
        

          
            <Card className={PostStyles.post}  interactive={true} key={post._id}   >
              <div className={PostStyles.postContent}>
                <div className={PostStyles.postHeader}>
                  
                  <h1  style={{
      flex: 2,
      fontSize: '2rem', // Adjust the font size as needed
       // Prevent text from wrapping to the next line
      overflow: 'hidden', // Hide overflowing text
      textOverflow: 'ellipsis', // Display an ellipsis for overflowed text
      cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
    }} onClick={()=>{router.push(`/posts/view/${post._id}`)}} >{post.title}</h1>
                  <Button style={{ background:'none',boxShadow:'none'}} onClick={togglePin} icon={<svg width="50px" height="50px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xmlSpace="preserve">
	                    <path fill={isPinned ? 'black' : 'white'} fill-opacity="1" stroke="black" stroke-width="2" stroke-linejoin="round" d="M 56.1355,32.5475L 43.4466,19.8526C 42.7886,20.4988 42.298,21.2123 41.9749,21.9932C 41.6519,22.7741 41.4903,23.5729 41.4903,24.3895C 41.4903,25.1942 41.6529,25.987 41.9779,26.7679L 34.0577,34.6821C 33.3918,34.3372 32.6991,34.0776 31.9796,33.9032C 31.2601,33.7288 
                      30.5298,33.6415 29.7885,33.6415C 28.623,33.6415 27.4953,33.8526 26.4052,34.2748C 25.315,34.697 24.3419,35.3342 23.4856,36.1865L 30.2344,42.9174L 25.9027,47.9032L 22.6532,51.8425L 20.5988,54.5836C 20.1212,55.2892 19.8823,55.753 19.8823,55.975L 19.8645,56.0701L 19.9002,56.088L 19.9002,56.1474L 19.9358,56.1058L 20.0131,56.1236C 20.2351,56.1236 20.6989,55.8888 21.4045,55.419L 24.1457,53.3765L 28.0849,50.1151L 33.0945,45.7775L 39.8016,52.5025C 40.6579,51.6462 41.2961,50.6731 41.7163,49.5829C 42.1365,48.4928 42.3466,47.367 42.3466,46.2056C 42.3466,45.4603 42.2603,44.729 42.0879,44.0115C 41.9155,43.294 41.6548,42.6003 41.3069,41.9304L 49.2202,34.0161C 50.0011,34.3372 50.7939,34.4978 51.5986,34.4978C 52.4192,34.4978 53.2189,34.3362 53.9979,34.0132C 54.7768,33.6901 55.4894,33.2015 56.1355,32.5475 Z "/>
                  </svg>}/>

                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon icon="user" />
                  <span style={{ fontWeight: 700 }}>{post.user.profileName ? post.user.profileName : post.user.email}</span>
                </div>
                <p>{formatMonthAndYear(post.createdAt)}</p>
                </div>
              <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <Image loader={post.clickUpImageSrc ? ()=>post.clickUpImageSrc : null} src={post.clickUpImageSrc ? post.clickUpImageSrc : ContentImage}
               width='400'
               height='200'
               style={{borderRadius:'2%',maxWidth: '100%'}}
               
               />
                </div>
               
               
                
                <div style={{ fontWeight: '500', letterSpacing: '1px', margin: '2%' }}>
                  {truncateText(post.description, 2)}
                </div>
                
              
                
              </div>
              <div style={{alignSelf:'self-end', display:'flex', flexDirection:'row', }}>
               <p ><Tooltip
               interactionKind="hover"
               position="top"
               
               popoverClassName={Classes.POPOVER_CONTENT_SIZING}
               content={
                <div>
                    like this content if you love it
                </div>
                
                }
                >
                <Button 
                  style={{zIndex:100, background:'none',boxShadow:'none', margin:"0"}} 
                  onClick={toggleLike} 
                  icon={<LikeSVGComponent h="20px" w="20px" fill={isLiked?"black":"white"}/>}/>
                </Tooltip>
                </p>
               <p ><Button style={{zIndex:100, background:'none',boxShadow:'none', margin:"0"}}  icon={<LinkSVGComponent h="20px" w="20px" fill="white"/>}/></p>
               
                </div>
            </Card>
            
            
        
    
    )
    

}
// export default Post;