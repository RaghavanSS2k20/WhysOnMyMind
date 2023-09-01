import React from "react"

export async function  getPostById(req,id){
    
    console.log(id)
    try{
        const response = await fetch(`http://localhost:8088/api/post/${id}`,{ credentials:'include', headers: {
            Cookie: req.headers.cookie,
          },})
        
        
        const status = response.status
        if(status == 401){
            return  {'status': 401}
        }
        
        
        if(response.ok){
            const postData = await response.json()
            const post = postData.post
            return post
        }
        else{
            console.log('post not found')
        }
    }catch(e){
        console.log(e)
        return JSON.stringify({error:e})
    
    }

}
