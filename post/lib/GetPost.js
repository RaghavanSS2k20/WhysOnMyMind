import React from "react"

export async function  getPostById(id){
    
    console.log(id)
    try{
        const response = await fetch(`http://localhost:8088/api/post/${id}`,{ credentials:'include',})
        const test = await response.json()
        
        const status = response.status
        if(status == 401){
            return  {'status': 401}
        }
        console.log(test.post)
        
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
