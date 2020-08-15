import React, { useState } from 'react'
import Input from '../Forms/Input'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET } from '../../api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'

const LoginPasswordReset = () => {
    const [login, setLogin] = useState('')
    const [key, setKey] = useState('')
    const password = useForm()
    const {error, loading, request} = useFetch()
    const navigate = useNavigate()
    
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const key = params.get('ket')
        const login = params.get('login')
        if(key) setKey(key)
        if(login) setLogin(login)
    },  [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const {options, url} = PASSWORD_RESET({login,password: password.value, key})
        const {response } = await request(url, options)
        if(response.ok) navigate('/login')
    }
    
    return (
        <div>
            <Head title='Resetar Senha' />
            <h1 className='title'>Resete a senha</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Senha' type='password' name='password' {...password} />
                {error && <Error error={error} /> }
                {loading ? <Button disabled>Resetando...</Button> : <Button>Resetar</Button>}
            </form>
        </div>
    )
}

export default LoginPasswordReset
