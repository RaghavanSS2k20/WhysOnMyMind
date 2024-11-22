import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import utilStyle from '../styles/utils.module.css'

import editStyles from '../styles/Edit.module.css'
import dynamic from "next/dynamic";
import { useState , useRef,useEffect  } from "react";
import { saveAs } from "file-saver"; // Library to save files
import CategoryDropdownWithTags from "@/components/CategoryDropdowns";
import ImageSVGComponent from "@/assets/SVGComponents/ImageSVGCOmponent";
import MultiSelectExample from "@/components/MultiSelectCategory";
import EmojiPickerButton from "@/utils/EmojipickerButton";
import emoji from 'emoji-dictionary'
import { useRouter } from "next/router";
import { SlackSelector } from "@charkour/react-reactions";
import { GithubSelector } from '@charkour/react-reactions';
import MarkdownWithOverlay from "@/utils/MdWithOverlay";
import AuthOverlay from "@/components/auth/Auth";
import { Menu,MenuItem } from "@blueprintjs/core";
import { NextSeo } from "next-seo";
 // Import the CSS for emoji-mart



import NavBar from "@/components/Navbar";

import { bold, checkedListCommand, code, codeBlock, codePreview, divider, hr, italic, link, orderedListCommand, quote, title, title3, unorderedListCommand } from "@uiw/react-md-editor/lib/commands";


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);


const commands = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.commands), { ssr: false });
const ICommand = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.ICommand), { ssr: false });
const TextState = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.TextState), { ssr: false });
const TextAreaTextApi = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.TextAreaTextApi), { ssr: false });

function Edit() {
 
  const mdEditorRef = useRef(null)
  const emojiRef = useRef('')
  const [value,setValue]=useState("**Loading...**")
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [User, Setuser] = useState(null)
  const [TittleInput,SetTitileInput] = useState("A Valid name of your work?")
  const [isNewPostNeeded, setIsNewPostNeeded]= useState(true)
  const [SelectedEmoji, setSelectedEmoji]=useState("")
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLoading, setItsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [NewPostId, setNewPostId] = useState(null)
  const [mdEditorTextApi, setMdEditorTextApi] = useState(null);
  const [isContentModified, setIsContentModified] = useState(false);
  const [isAbout, setIsAbout] = useState(false)
  
  useEffect(() => {
    if (mdEditorRef.current) {
      // The ref is now properly initialized
      console.log("MDEditor ref is ready");
     
    }
  }, [mdEditorRef]);
  let em = ''
  const router = useRouter()
  useEffect(() => {
    // Function to fetch the MD file content
    const fetchMDContent = async () => {
      console.log(isAuthenticated)
      try {
        const response = await fetch("https://whysonmymind-backend-production.up.railway.app/write",{  credentials: 'include', }); // Fetch from your Express API route
        const data = await response.json();
        console.log(data)
        
        if(response.ok){
          setIsAuthenticated(true);
          if(data.id){
            console.log("content available so",data.id)
            setNewPostId(data.id)
            const response = await fetch(`https://whysonmymind-backend-production.up.railway.app/api/post/${data.id}`,{  credentials:'include', })
            console.log(response.status)
          
            const alreadydata = await response.json()
            console.log("alrready data , ",alreadydata.post.post.content)
            if(alreadydata.post.status === 'ABOUT'){setIsAbout(true)}
            setValue(alreadydata.post.post.content)
            setIsNewPostNeeded(false)
            
          }
          else{
        const mdContent = data.content || "**WhysOnMyMind!!**"; // Default content if fetch fails
        setValue(mdContent);
          }
        setItsLoading(true);
        

        
        }else{
          if(response.status==401){
            const mdContent = "**WhysOnMyMind!!**"
            setValue(mdContent);
            
              

            
          }
        }
      } catch (error) {
        console.error("Error fetching MD file:", error);
        setValue("Error fetching content. Please try again later.");
        setItsLoading("false")
      }
    };

    fetchMDContent(); // Call the function to fetch the MD content
  }, []);
  const clearSession=async()=>{
    const uri = process.env.backendUrl+"api/user/clear-session"
    const response = await fetch(uri,{
      credentials:'include',
      method:'DELETE'
    })
    if(response.ok){
      router.push('/profile/me')
    }
  }
  const handleContentChange = async (newValue) => {
    setValue(newValue);
    setIsContentModified(true);
   
    var bostID = NewPostId;
    if(isNewPostNeeded){
      console.log('new post will be created')
      const response = await fetch("https://whysonmymind-backend-production.up.railway.app/api/post/create",
      {method:'POST', 
      headers: {
          'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify({ content: value }),
      credentials:'include'}
      )
      const data = await response.json()
     
      if(response.ok){
        setNewPostId(data.id)
        console.log("hii")
        console.log("new post created , ",NewPostId)
        if(!bostID){
          console.log('hii')
          bostID = data.id

        }
        else{
          console.log('biisiisiisi')
          bostID = NewPostId
        }
        
      }
      else{
        setValue("Some thing went wrong")
      }
      setIsNewPostNeeded(false)
    }
    console.log("bost is ",bostID)
    
    const response = await fetch(`https://whysonmymind-backend-production.up.railway.app/api/post/update/content/${bostID}`,{  
      method:'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({ content: value }) 

     })
    if(response.ok){
      console.log("updated")
    }
    else{
      console.log("update failed")
      setValue("Some thing went wrong")
    }
   
      

     // Content has been modified
  };
  useEffect(() => {
    // This code will run whenever SelectedEmoji changes
    
    em = SelectedEmoji
    console.log('em value : ',em)
    // You can perform any actions or updates here that depend on SelectedEmoji
  }, [SelectedEmoji]);

  const HandleEmojiPickup = (emojiData) => {
    
    emojiRef.current = emojiData
    
    
  };
  const handleButtonClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };
  console.log('em value 2 : ',em)
  const handleImageUpload = (event) => {
    console.log("hiisiiaiiaiiaiiai")
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch(process.env.imageHandler+"upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data['imageUrl'])
        const imageUrl = data['imageUrl']

        if (mdEditorTextApi) {
          // Insert the image link at the cursor's current position
          const imageMarkdown = `![Image](${imageUrl})`;
        mdEditorTextApi.replaceSelection(imageMarkdown);
        }
        
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const saveContentToFile = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    console.log(NewPostId)
    console.log(isContentModified)
    saveAs(blob, "myMarkdownFile.md");
     // Reset content modification flag
  };
  const PostContent = async () =>{
     const response = await fetch('https://whysonmymind-backend-production.up.railway.app/api/post/submit',{
      credentials:'include',
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({ title: TittleInput,
                              category:'Life Lesson'}) 
      })
      if(response.ok){
        router.push('/posts')
        console.log('posted succesfully')
      }else{
        console.log(response)
      }
  }

  // }
 
  const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name))
  
  
  const imageInsert = {
    name: 'imageInsert',
    keyCommand: 'imageInsert',
    buttonProps: { 'aria-label': 'Insert Image' },
    icon: (
      <ImageSVGComponent/>
    ),
    execute: async (state, api) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', async () => {
        const file = input.files[0];
  
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
  
          try {
            const response = await fetch(process.env.imageHandler+"upload", {
              method: 'POST',
              body: formData,
            });
  
            if (response.ok) {
              const responseData = await response.json();
              
       
              const imageUrl = responseData.imageUrl;
  
              const modifyText = `![Image](${imageUrl})`;
              api.replaceSelection(modifyText);
            } else {
              console.error('Image upload failed.');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      });
  
      input.click();
    },
  };
  let e = ""
  const testAddText = {
    name:'addtext',
    keyCommand:'addText',
    buttonProps:{'aria-label':'Testing insertText'},
    icon: (
      <div>
      <div onClick={handleButtonClick}style={{
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
   
    color: 'inherit', // Use the text color from the parent element
  }}>
      {isPickerOpen ? (() => {
  // Function to display when the picker is open
  emojiRef.current = ""
  return '❌';
})() : (() => {
  // Function to display when the picker is closed
  emojiRef.current = ""
  return '😊';
})()}
      </div>
      {isPickerOpen && (
        
        
          
        <GithubSelector onSelect={HandleEmojiPickup}/>
       
        
        
      )}
    </div>
    ),
    execute:(state,api)=>{
      let modifyText = em
      api.replaceSelection(emojiRef.current)
      

    }
  }
  const HandletitleInput = (event)=>{
    SetTitileInput(event.target.value)

  }
  
  const customTools = [
    
    imageInsert,
    title,
    bold,
    italic,
    link,
    divider,
    code,
    quote,
    hr,
    codeBlock,
    divider,
   
    orderedListCommand,
    checkedListCommand,
    unorderedListCommand,
    testAddText,];
    
  

   

  return (
    <div className={editStyles.container}>
       <NextSeo
            title="Spill your mind"
            description="Ready to tell your story? Dive into the world of blogging on our  page and Craft compelling stories and ideas that resonate with a global audience"
        />


       <NavBar/>
       {isAuthenticated?(
        <div>
        <div style={{border:'1px',padding:'1%',display:'flex',flexDirection:'row', justifyContent:'space-between',backgroundColor:'#0D1117'}}>
          <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between', width:'25%', alignItems:'center'}}>
                <input
                
                  type="text"
                  style={{
                    border: "1px solid white",
                    borderRadius:'2%',
                    padding: "2%",
                    outline: "none",
                    boxShadow: "0 0 5px white",
                    transition: "box-shadow 0.3s ease-in-out",
                    fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                    backgroundColor:'#0D1117',
                    color:"white"
                  
                    
                  }}
                  value={TittleInput}
                  onChange={HandletitleInput}
                  placeholder="A Valid name of your work?"
                  onFocus={(e) => {
                    e.target.style.boxShadow = "0 0 10px white";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "0 0 0 0";
                  }}
              />
              
              <CategoryDropdownWithTags/>
             
              </div>
              {isAbout?(
                <button className={editStyles.submitbutton} onClick={clearSession}
                disabled={!isContentModified}>
                  Save About
                 </button>
                ):(
                     
                       <button className={editStyles.submitbutton} onClick={PostContent}
                       disabled={!isContentModified}>
                         Post
                       </button>

          )}
              
        </div>
       
        <div  data-color-mode="light" >  
          <MDEditor 
          commands={customTools}  
          components={{
                   preview: (source, state, dispath) => {
                        return <div><MarkdownWithOverlay markdownContent={value} /></div>
                      }
                    }}
          ref={mdEditorRef} 
          
          
          value={value} 
          onChange={handleContentChange} 
          style={{ padding: 0, margin:0}} 
          suppressHydrationWarning={true}
          
          />
          
        </div>
        </div>
  ):( <>
    <AuthOverlay isOpen={true}  />
    </>)}
        
       
        
    </div>
  );
                }
  
   



export default Edit;
