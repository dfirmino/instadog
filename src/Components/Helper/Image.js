import React from 'react'
import styles from './Image.module.css'

const Image = ({alt, src}) => {
    const [skeleton, setSkeleton] = React.useState(true)
    
    const handleLoad = ({target}) => {
        target.style.opacity = 1
        setSkeleton(false)
    }
    return (
        <div className={styles.wrapper}>
            {skeleton && <div className={styles.skeleton}></div>}
            <img onLoad={handleLoad} className={styles.img} alt={alt} src={src}/>
        </div>
    )
}

export default Image