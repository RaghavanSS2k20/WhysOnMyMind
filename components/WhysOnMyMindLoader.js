import loaderStyles from "./styles/loader.module.css"
import React from "react"
const WhysOnMyMindLoader = ()=>{
    return(
        <div className={loaderStyles.container}>
        <pre className={loaderStyles.asciiart}>
 {` 



                                                                                                                           
dddddddd                                             
LLLLLLLLLLL                                                           d::::::d  iiii                                       
L:::::::::L                                                           d::::::d i::::i                                      
L:::::::::L                                                           d::::::d  iiii                                       
LL:::::::LL                                                           d:::::d                                              
  L:::::L                  ooooooooooo     aaaaaaaaaaaaa      ddddddddd:::::d iiiiiiinnnn  nnnnnnnn       ggggggggg   ggggg
  L:::::L                oo:::::::::::oo   a::::::::::::a   dd::::::::::::::d i:::::in:::nn::::::::nn    g:::::::::ggg::::g
  L:::::L               o:::::::::::::::o  aaaaaaaaa:::::a d::::::::::::::::d  i::::in::::::::::::::nn  g:::::::::::::::::g
  L:::::L               o:::::ooooo:::::o           a::::ad:::::::ddddd:::::d  i::::inn:::::::::::::::ng::::::ggggg::::::gg
  L:::::L               o::::o     o::::o    aaaaaaa:::::ad::::::d    d:::::d  i::::i  n:::::nnnn:::::ng:::::g     g:::::g 
  L:::::L               o::::o     o::::o  aa::::::::::::ad:::::d     d:::::d  i::::i  n::::n    n::::ng:::::g     g:::::g 
  L:::::L               o::::o     o::::o a::::aaaa::::::ad:::::d     d:::::d  i::::i  n::::n    n::::ng:::::g     g:::::g 
  L:::::L         LLLLLLo::::o     o::::oa::::a    a:::::ad:::::d     d:::::d  i::::i  n::::n    n::::ng::::::g    g:::::g 
LL:::::::LLLLLLLLL:::::Lo:::::ooooo:::::oa::::a    a:::::ad::::::ddddd::::::ddi::::::i n::::n    n::::ng:::::::ggggg:::::g 
L::::::::::::::::::::::Lo:::::::::::::::oa:::::aaaa::::::a d:::::::::::::::::di::::::i n::::n    n::::n g::::::::::::::::g 
L::::::::::::::::::::::L oo:::::::::::oo  a::::::::::aa:::a d:::::::::ddd::::di::::::i n::::n    n::::n  gg::::::::::::::g 
LLLLLLLLLLLLLLLLLLLLLLLL   ooooooooooo     aaaaaaaaaa  aaaa  ddddddddd   dddddiiiiiiii nnnnnn    nnnnnn    gggggggg::::::g 
                                                                                                                   g:::::g 
                                                                                                       gggggg      g:::::g 
                                                                                                       g:::::gg   gg:::::g 
                                                                                                        g::::::ggg:::::::g 
                                                                                                         gg:::::::::::::g  
                                                                                                           ggg::::::ggg    
                                                                                                              gggggg       



                                                                                                              
                                                                  
`}
        </pre>
        <div className={loaderStyles.footnote}>
                Please wait Loading your content!,WhyOnM Server has been hosted on Free tier of Onrender!!
                Inactivity spins it Down!!

            </div>
        
        </div>
    )
}

export default WhysOnMyMindLoader