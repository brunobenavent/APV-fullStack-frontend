import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})
    
    const {guardarPaciente, paciente} = usePacientes()


    useEffect( () => {
        if(paciente?.nombre){
            setNombre(paciente?.nombre)
            setPropietario(paciente?.propietario)
            setEmail(paciente?.email)
            setFecha(paciente?.fecha)
            setSintomas(paciente?.sintomas)
            setId(paciente?._id)
        }
    },[paciente] )
 


    const handleSubmit = e => {
        e.preventDefault()
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                error:true,
                msg: "Todos Los campos son obligatorios"
            })
            return
        }
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            msg: 'Paciente editado correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
        
    }
  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">Añade tus Pacientes y {''}<span className="text-indigo-600 font-bold">Adminístralos</span></p>
        {alerta.msg && <Alerta 
            alerta={alerta}
        />}
        <form
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            id="formulario"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="text-gray-700 font-bold uppercase"
                >Nombre mascota</label>
                <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="text-gray-700 font-bold uppercase"
                >Propietario</label>
                <input
                    type="text"
                    id="propietario"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 font-bold uppercase"
                >Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="text-gray-700 font-bold uppercase"
                >Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="text-gray-700 font-bold uppercase"
                >Síntomas</label>
                <textarea
                    placeholder="Describe los Síntomas"
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>
            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 rounded-lg text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={id ? "Guardar Cambios" : "Agregar Paciente"}
            />
        </form>
    </>
  )
}

export default Formulario
