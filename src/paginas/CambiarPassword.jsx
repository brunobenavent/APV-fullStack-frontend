import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({})


  const handleSubmit = e => {
    e.preventDefault()
    console.log(Object.values(password))
  }



  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}<span className="text-indigo-600 font-bold">Password aquí</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {alerta.msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="password-actual" className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            id="password-actual"
                            name="pwd_actual"
                            value={password.pwd_actual || ''}
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                            placeholder="Escribe tu password actual"
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="password" className="uppercase font-bold text-gray-600">Password Nuevo</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            id="password-nuevo"
                            name="pwd_nuevo"
                            value={password.pwd_nuevo || ''}
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name]: e.target.value
                            })}
                            placeholder="Escribe tu nuevo password"
                        />
                    </div>
  
                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-600 transition-colors"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword
