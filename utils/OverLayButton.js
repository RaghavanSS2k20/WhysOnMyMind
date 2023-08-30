const OverlayButton = ({onClick,label})=>{
    return(
    <button className="overlay-button" onClick={onClick}>
        {label}
    </button>
    )
}
export default OverlayButton