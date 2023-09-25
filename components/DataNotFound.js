import NotFoundsvg from '../assets/404.svg'
import Image from 'next/image'

const NotFound = ()=>{
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        
        <p 
        style={{fontFamily:"font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",
        fontWeight:'800',
        color:'grey',
        fontSize:'200%'
    
                    }}>"This user has no story??"</p>
                    
        </div>
    )
}
export default NotFound