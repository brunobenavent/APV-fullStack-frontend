import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";


const PacientesContext = createContext()
    

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    
    useEffect( () =>{
        const obtenerPacientes = async() => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                if(!token) return
                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    }, [])

    const guardarPaciente = async paciente => {

        if(paciente.id){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{
            
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
    
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes, ])
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }


    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }
    
    
    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Seguro que deseas elininar el paciente?')
        if(confirmar){

            try {
                const token = localStorage.getItem('token')
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                    const nuevosPacientes = pacientes.filter( pacienteState => pacienteState._id !== id)
                    setPacientes(nuevosPacientes)
                
            } catch (error) {
                console.log(error)
                
            }
        }
    }


    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}

export default PacientesContext