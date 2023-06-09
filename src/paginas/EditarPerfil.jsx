import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => { 
    
    const {auth,
        actualizarPerfil,
        alerta, setAlerta} = useAuth()

    const [perfil, setPerfil] = useState({})
    
    
    useEffect(() => {
        setPerfil(auth)
    }, [auth])
    
    const handleSubmit = async e =>{
        e.preventDefault()
        const {nombre, email} = perfil
        if([nombre, email].includes('')){
            setAlerta({
                error: true,
                msg: 'El nombre y el email son campos obligatorios'
            })
            return  
        }
        actualizarPerfil(perfil)
    }

  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}<span className="text-indigo-600 font-bold">Información aquí</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {alerta.msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            id="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.id]: e.target.value,
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="web" className="uppercas font-bold text-gray-600">Sitio Web</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            id="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,  
                                [e.target.id]: e.target.value,
                            })}
                        />
                    
                    </div>
                    <div className="my-3">
                        <label htmlFor="telefono" className="uppercas font-bold text-gray-600">Teléfono</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            id="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value,
                            })}
                        />
                
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="uppercas font-bold text-gray-600">Email</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            id="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value,
                            })}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-600 transition-colors"
                    />
                </form>
            </div>
        </div>
    </>
  )
}
export default EditarPerfil
