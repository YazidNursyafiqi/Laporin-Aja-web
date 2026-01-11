import styles from "./post.module.css"

function Post({from,likes,comments,location,type,perpetrator,victim,explain,image}){
    return(
        <>
            <div id={styles.container}>
                <div id={styles.account}>
                    <img src="/icons/user.png"/>
                    <p>{from}</p>
                </div>
                <div id={styles.explain}>
                    {explain}
                </div>
                <div id={styles.image}>
                    <img src={image}></img>
                </div>
                <div id={styles.perpetrator}>
                    <p>Siapa saja yang terkait:</p>
                    <div id={styles.itemContainer}>
                        {Object.keys(perpetrator).map(key=>(
                            <>
                                <div id={styles.item}>
                                    <p id={styles.itemName}>{key}</p>
                                    <p id={styles.itemRole}>{perpetrator[key]}</p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post