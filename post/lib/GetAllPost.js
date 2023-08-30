


export async function getAllPostsData(){
    try{
    const postContent = await fetch('http://localhost:8088/api/test')
    const data = await postContent.json()
    return data.content
    }catch(error){
        console.error("Error fetching MD file:", error);
       return "Error fetching content. Please try again later."
    }
    
}