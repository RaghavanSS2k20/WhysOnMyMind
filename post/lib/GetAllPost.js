


export async function getAllPostsData(){
    try{
    const postContent = await fetch('https://whysonmymind-backend-production.up.railway.app/api/post/',{credentials:'include'})
    const data = await postContent.json()
    const posts = data.posts;
   return posts.map((post)=>{
    return {params:{id:post._id}}
   })
   console.log(paths)
   
    }catch(error){
        console.error("Error fetching MD file:", error);
       return "Error fetching content. Please try again later."
    }
    
}