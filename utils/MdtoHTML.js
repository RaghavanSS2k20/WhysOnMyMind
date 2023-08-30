import React,{useState} from 'react'
import { marked } from 'marked'
const MdToHTML=(props)=>{
    const htmlContent = marked(props.content)
    return(
        <>
        {htmlContent}
        </>
        
    )
}
export default MdToHTML