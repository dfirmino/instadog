import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginPasswordLost = () => {
    const login = useForm()
    const {data, error, loading, request} = useFetch()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(login.validate()) {
            const {url, options} = PASSWORD_LOST({login: login.value, url: 'http://localhost:3000/login/resetar'})
            const {json} = await request(url, options)
        }
    }
    return (
        <section>
            <Head title='Resetar Senha' />
            <h1 className='title'> Perdeu a senha?</h1>
            {data ?
             <p style={{color: '#4c1'}}>{data}</p>
             : <form onSubmit={handleSubmit}>
                <Input label='Email / Usuário' type='text' name='email' {...login} />
                {!loading && <Button>Enviar Email</Button>}
                {loading && <Button disabled>Enviando...</Button>}
                {error && <Error error={error} />}
            </form>}
        </section>
    )
}

export default LoginPasswordLost
