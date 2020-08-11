import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom'

const UserHeader = () => {
    const [title, setTitle] = React.useState('')
    const location = useLocation()

    React.useEffect(() => {
        const title = location.pathname.split('/')
        setTitle(title[title.length - 1 ])
    }, [location])
    return (
        <header className={styles.header}>
            <h1 className='title' style={{textTransform: 'capitalize'}}>{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader
