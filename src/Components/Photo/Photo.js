import React, { useEffect } from 'react'
import styles from './Photo.module.css'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { PHOTO_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from './PhotoContent'
import Head from '../Helper/Head'

const Photo = () => {
    const {id} = useParams()
    const {request, data, loading, error} = useFetch()
    
    useEffect(() => {
        const { url, options } = PHOTO_GET(id)
        request(url, options)
        
    }, [id, request])
    
    if(error) return <Error error={error} />
    if(loading) return <Loading />
    if(data) return (
        <section className='container mainContainer'>
            <Head title='Foto' />
            {console.log('data',data)}
            <PhotoContent data={data} single={true}/>
        </section>
    )
    return null
}

export default Photo