import Profile from "@/components/Profile"
import NavBar from "@/components/Navbar"
export default function Me ({postedPosts, userData, draftedPosts}){
    
    return(
        <>
        <NavBar/>
        <Profile draftedPosts={draftedPosts} postedPosts={postedPosts} userData={userData} isMe={true}/>

        </>
    )
}
export const getServerSideProps = async (context)=>{
    const {req} = context
    const response = await fetch('http://localhost:8088/api/user/get/current',{ credentials:'include', headers: {
        Cookie: req.headers.cookie,
      },})
      if(!response.ok){
        return {
            notFound:true
        }
        }
    const data = await response.json()
    const user =data.user
    const userPosts = user.posts
    let isPostAvailable = true
    let postedPosts = []
    let draftedPosts = []
    if(!userPosts){
        isPostAvailable = false;
    }else{
        postedPosts = userPosts.filter(post=>post.status==="POSTED")
        
        draftedPosts=userPosts.filter(post=>post.status==="DRAFT")

    }
  //   const pinnedPostRes = await fetch(`http://localhost:8088/api/user/get/pinnedposts`,
  // {credentials:'include',
  // headers: {
  //   Cookie: req.headers.cookie,
  // }
  //   }
  // )
  console.log("DraftetstaDVH POSOSOOSOOSOOS",draftedPosts)
  
    const userPinnedP = user.pinnedPost
    
    let userLiked = user.likedPost 
    
    const userPinnedPosts = [...new Set(userPinnedP)];
    userLiked = [...new Set(userLiked)]
    if(userPinnedPosts){
  
  
        postedPosts.forEach((post) => {
          
          post.isPinned = userPinnedPosts.includes(post._id.trim());
        });
      
    }
    if( userLiked){
      postedPosts.forEach((post)=>{
        post.isLikedByUser = userLiked.includes(post._id.trim());
      })
    }
   
    return {
        props:{
            postedPosts:postedPosts,
            userData:user,
            draftedPosts:draftedPosts
        }
    }

      

}