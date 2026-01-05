import styles from './buttonUI.module.css'

function Rounded_button({text,onClick}){
    return(
        <button onClick={onClick} id={styles.Rounded_button} className={styles.buttonUI}>
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