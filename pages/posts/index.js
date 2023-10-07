import Post from "@/components/Post";
import NavBar from "@/components/Navbar";
import AllPostStyles from '../../styles/allpost.module.css'
const AllPosts = ({allPosts, isAuthenticated})=>{
  return (
    <>
    <NavBar/>
    <div className={AllPostStyles.posts}>
      {allPosts.map((post) => (
  isAuthenticated ? (
    <Post
      key={post._id}
      post={post}
      isPostPinned={post.isPinned}
      isPostLikedByUser={post.isLikedByUser}
    />
  ) : (
    <Post key={post._id} post={post} />
  )
))}
    </div>
    </>
  );
}
export async function getServerSideProps(context) {
  
  const {req} = context
  // console.log("cookies , ", req.headers.cookie)
  
  // Fetch your posts data
  const res = await fetch('http://localhost:8088/api/post/',{
    credentials:'include'})
 
  const posts = await res.json()
 
  const allPosts = posts.posts
  if(req){
  const pinnedPostRes = await fetch(`http://localhost:8088/api/user/get/pinnedposts`,
  {credentials:'include',
  headers: {
    Cookie: req.headers.cookie,
  }
    }
  )
  if(pinnedPostRes.status === 401){
    return {
      props:{
        allPosts:allPosts,
        isAuthenticated:true
      }
    }
  }
  const likedPostRes = await fetch("http://localhost:8088/api/user/get/liked",{credentials:'include',
  headers: {
    Cookie: req.headers.cookie,
  }
    })
  
  const userPinnedP = await pinnedPostRes.json();
  let userLiked = await likedPostRes.json() 
  
  const userPinnedPosts = [...new Set(userPinnedP.pinned)];
  userLiked = [...new Set(userLiked.post)]

 
  if(pinnedPostRes.ok && userPinnedPosts){
  
  
    allPosts.forEach((post) => {
      
      post.isPinned = userPinnedPosts.includes(post._id.trim());
    });
  
}
if(likedPostRes.ok && userLiked){
  allPosts.forEach((post)=>{
    post.isLikedByUser = userLiked.includes(post._id.trim());
    
  })
}
  }

 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      allPosts:allPosts,
      isAuthenticated:true
    },
  }
}
export default AllPosts