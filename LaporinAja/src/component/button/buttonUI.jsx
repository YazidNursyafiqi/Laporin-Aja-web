function Rounded_button({text,onClick}){
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}

function Link_button({text,onClick}){
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
}

export {Rounded_button , Link_button}