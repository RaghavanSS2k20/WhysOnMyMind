import Custom504Styles from '../styles/504.module.css'
const text = `
███████╗ ██████╗ ██╗  ██╗    ████████╗██╗███╗   ███╗███████╗     ██████╗ ██╗   ██╗████████╗
██╔════╝██╔═████╗██║  ██║    ╚══██╔══╝██║████╗ ████║██╔════╝    ██╔═══██╗██║   ██║╚══██╔══╝
███████╗██║██╔██║███████║       ██║   ██║██╔████╔██║█████╗      ██║   ██║██║   ██║   ██║   
╚════██║████╔╝██║╚════██║       ██║   ██║██║╚██╔╝██║██╔══╝      ██║   ██║██║   ██║   ██║   
███████║╚██████╔╝     ██║       ██║   ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝╚██████╔╝   ██║   
╚══════╝ ╚═════╝      ╚═╝       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝  ╚═════╝    ╚═╝   
`

const ping = async ()=>{
    try{
    const res = await fetch("/api/send",{
        method: "POST",
        body: JSON.stringify({ "message":"Hello" })
    })
    if (res.ok){
        console.log("Succesfully pinged")
    }
    else{
        console.log("NOT Succesfully pinged")

    }
    
}catch(e){
    console.log("Error while pinging , ", e)

}


}
const Custom504 = ()=>{
    return(
        <div className={Custom504Styles.container}>
            <pre className={Custom504Styles.asciiart}>
                {text}
            </pre>
            <div className={Custom504Styles.content}>
                Ping <span onClick={ping}> Raghavan </span> To wake the instance up!!
            </div>
            <div className={Custom504Styles.footnote}>
                WhyOnM Server has been hosted on Free tier of Onrender!!
                Inactivity spins it Down!!

            </div>

        </div>


        
    )
}
export default Custom504