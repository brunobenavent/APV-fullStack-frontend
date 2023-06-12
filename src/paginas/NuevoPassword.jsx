import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)



    const {token} = useParams()

    useEffect(()=>{
        const comprobarToken = async () => {
            try {
                const url = `veterinarios/olvide-password/${token}`
                await clienteAxios(url)
                setAlerta({
                    msg: 'Coloca tu nuevo Password'
                })
                setTokenValido(true)
            } catch (error) {
            setAlerta({
                error: true,
                msg: 'Hubo un error con el enlace'
            })
                
            }

        }
        comprobarToken()
    }, [])
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const url = `veterinarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url, {password})

            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y no Pierdas Acceso a{''}<span className="text-black"> tus Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {alerta.msg && <Alerta
                alerta={alerta}
            />}
            {tokenValido && (
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >Nuevo Password</label>
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
                        value="Guardar Nuevo Password"
                        className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 md:w-auto"
                    />

                </form>


            ) }

            

        </div>
    </>
  )
}

export default NuevoPassword
