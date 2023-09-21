import Profile from "@/components/Profile"
import NavBar from "@/components/Navbar"
import { Suspense } from "react"
import { getUserByEmail, getCurrentUser } from "@/lib/user/GetUser"

const ProfilePage = ({postedPosts, userData})=>{
    return(
        <>
        <NavBar/>
        <Suspense fallback={<p>Loading feed...</p>}>
          <Profile postedPosts={postedPosts} userData={userData}/>
        </Suspense>
        </>
    )
}
export default ProfilePage

export const getServerSideProps = async (context)=>{
    const {profileByEmail}=context.params
    const email = profileByEmail
    
    const {req} = context
    const user = await getUserByEmail(req,email)
    // console.log("posoosoosoosoosts ", user.user)
    let isValid = true
    if(!user){
      isValid = false
      return {
        notFound: true,
      }
    }
    const userPosts = user.user.posts
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
    const currentUser = await getCurrentUser(req)

    const userPinnedP = currentUser.user.pinnedPost
    
    let userLiked = currentUser.user.likedPost 
    
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
            userData:user.user
        }
    }


}