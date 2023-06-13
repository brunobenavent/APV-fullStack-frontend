import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [ email, setEmail]  = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const navigate = useNavigate()
  const {setAuth} = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    if([email, password].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true})
      return
    }
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
      setAlerta({
        msg: 'Usuario autenticado correctamente',
      })
      localStorage.setItem('token', data.token)
      console.log(data)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg
      })
      
    }
  }
  return (
    <> 
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y administra tus {''}<span className="text-black">Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {alerta.msg && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Email</label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              id="email"
              value = {email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Password</label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 md:w-auto"
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to="/registrar"
            className='block text-center my-5 text-gray-500'
            >
              ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            to="/olvide-password"
            className='block text-center my-5 text-gray-500'
            >
              Olvidé mi password
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Login