import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import { USER_POST } from '../../api'
import {UserContext} from '../../UserContext'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginCreate = () => {
    const username = useForm()
    const email = useForm('email')
    const password = useForm()
    const { userLogin } = React.useContext(UserContext)
    const {loading, error, request } = useFetch()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(username.validate() && password.validate() && email.validate()) {
            const {url, options} = USER_POST({username: username.value, password: password.value, email: email.value })
            const { response } = await request(url,options)
            if(response.ok) userLogin(username.value, password.value)
        }
    }
    
    return (
        <section className='animeLeft'>
            <Head title='Cadastro' />
            <h1 className='title'>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuário' type='text' name='username' {...username} />
                <Input label='Email' type='text' name='email' {...email} />
                <Input label='Senha' type='password' name='password' {...password} />
                <Error error={error} />
                {loading ? <Button disabled>Cadastrando...</Button>  : <Button>Cadastrar</Button> }
            </form>
        </section>
    )
}

export default LoginCreate
