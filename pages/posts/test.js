import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MdToHTML from "@/utils/MdtoHTML";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getAllPostsData } from "@/post/lib/GetAllPost";
import OverlayButton from "@/utils/OverLayButton";
const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
  );




    



  

const testContent = ()=>{
    const [selectedRange, setSelectedRange] = useState(null);
    const handleButtonClick = () => {
        // Implement your logic here for handling button click on the selected/highlighted range
        console.log('Button clicked on selected range');
      };
    const handleMouseUp = () => {
        console.log('hiii')
        const selection = window.getSelection();
        console.log(selection)
        if (selection && !selection.isCollapsed) {
          setSelectedRange(selection.getRangeAt(0));
        } else {
          setSelectedRange(null);
        }
      };
      const renderers = {
        paragraph: ({ children, ...props }) => {
          if (selectedRange) {
            const { startContainer, endContainer } = selectedRange;
            if (
              startContainer === props.node &&
              endContainer === props.node &&
              startContainer.parentNode.className === 'highlighted-line'
            ) {
              return (
                <div className="highlighted-line-container">
                  <div className="highlighted-line">{children}</div>
                  <div className="overlay-buttons">
                    <OverlayButton label="Button 1" onClick={handleButtonClick} />
                    <OverlayButton label="Button 2" onClick={handleButtonClick} />
                    <OverlayButton label="Button 3" onClick={handleButtonClick} />
                  </div>
                </div>
              );
            }
          }
    
          return <p {...props}>{children}</p>;
        },
      };


    const [content,setContent] = useState("**Loading...**")
    useEffect(()=>{
        const fetchContent = async ()=>{
            const cntt = await getAllPostsData()
            setContent(cntt)
            console.log(cntt)
        }
        fetchContent()

    },[])


  

return(
    <div onMouseUp={handleMouseUp} >
        <ReactMarkdown components={renderers} children={content}/>
    
    </div>
)
    
};
export default testContent