


export async function getAllPostsData(){
    try{
    const postContent = await fetch('http://localhost:8088/api/post/',{credentials:'include'})
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