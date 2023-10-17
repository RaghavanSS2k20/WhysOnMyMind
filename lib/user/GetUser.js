export async function getUserByEmail(req,email){
    try{
        
        const response = await fetch(`https://whyonm-api.onrender.com/api/user/get/email/${email}`,{ credentials:'include', headers: {
            Cookie: req.headers.cookie,
          },})
        if(response.ok){
            console.log("skjabdfkjsbdfkjasbfkjabsdgkjbasdvkjbaskjdvbasbvj")
            const user = await response.json()
            return user
        }
        console.log(response.status)
        return null
    }catch(e){}
}
export async function getCurrentUser(req){
    try{
        const uri = process.env.backendUrl+'api/user/get/current'
        const response = await fetch(uri,{
            credentials:'include', 
            headers: {
                Cookie: req.headers.cookie,
              },
        })
        if(!response.ok){
            return null
        }
        const user = await response.json()
        return user
    }catch(e){}
}