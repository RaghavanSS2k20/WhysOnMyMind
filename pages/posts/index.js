import Post from "@/components/Post";

import AllPostStyles from '../../styles/allpost.module.css'
const AllPosts = ({allPosts})=>{
  return (
    <div className={AllPostStyles.posts}>
      {allPosts.map((post) => (
        <Post key={post._id} post={post}  isPostPinned={post.isPinned}/>
      ))}
    </div>
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
  
  const userPinnedP = await pinnedPostRes.json();
  
  const userPinnedPosts = [...new Set(userPinnedP.pinned)];
 
  if(pinnedPostRes.ok && userPinnedPosts){
  
  
    allPosts.forEach((post) => {
      
      post.isPinned = userPinnedPosts.includes(post._id.trim());
    });
  
}
  }

 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {allPosts},
  }
}
export default AllPosts