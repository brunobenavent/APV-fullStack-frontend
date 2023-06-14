import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";


const PacientesContext = createContext()
    

export const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([])


    const guardarPaciente = async paciente => {
        console.log(paciente)
    }
    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}

export default PacientesContext