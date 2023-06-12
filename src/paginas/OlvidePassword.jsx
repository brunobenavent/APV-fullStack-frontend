import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if(email==='' || email.length < 6){
      setAlerta({
        error: true,
        msg: 'El campo email no puede ir vacío y debe de tener más de 6 caracteres'
      })
      return
    }
    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email })
      setAlerta({
        msg: data.msg
      })
      
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
            <h1 className="text-indigo-600 font-black text-6xl">Recupera tu acceso y no pierdas tus {''}<span className="text-black">Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {alerta.msg && <Alerta
            alerta={alerta}
          />}
          <form
            action=""
            onSubmit={handleSubmit}
          >
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Enviar Instrucciones"
              className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 md:w-auto"
            />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              to="/"
              className='block text-center my-5 text-gray-500'
              >
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link
              to="/registrar"
              className='block text-center my-5 text-gray-500'
              >
                ¿No tienes una cuenta? Regístrate
            </Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword
