import React from "react"

export async function  getPostById(req,id){
    
    console.log(id)
    try{
        const response = await fetch(`https://whysonmymind-backend-production.up.railway.app/${id}`,{ credentials:'include', headers: {
            Cookie: req.headers.cookie,
          },})
        
        
        const status = response.status
        if(status == 401){
            return  {'status': 401}
        }
        
        
        if(response.ok){
            const postData = await response.json()
            const post = postData
            console.log(post)
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
