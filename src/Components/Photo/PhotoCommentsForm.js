import React, { useState } from 'react'
import {ReactComponent as Enviar} from '../../Assets/enviar.svg'
import useFetch from '../../Hooks/useFetch'
import {COMMENT_POST} from '../../api'
import Error from '../Helper/Error'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({id, setComments, single}) => {
    const [comment, setComment] = useState('')
    const { error, request } = useFetch()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const { url, options } = COMMENT_POST(id, { comment })
        const {response, json} = await request(url, options)
        if(response.ok) {
            setComment('')
            setComments((comments) => [...comments, json])
        }
    }
    
    const handleChange = ({target}) => {
        setComment(target.value)
    }
    
    return (
        <form className={`${styles.form} ${single ? styles.single : null}`} onSubmit={handleSubmit}>
            <textarea className={styles.textarea} value={comment} onChange={handleChange} id='comment' name='comment' placeholder='Comente...'/>
            <button className={styles.button} > <Enviar /> </button>
            {error && <Error error={error} /> }
        </form>
    )
}

export default PhotoCommentsForm
