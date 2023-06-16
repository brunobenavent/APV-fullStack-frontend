import {useEffect, useState, createContext} from 'react'
import clienteAxios from '../config/axios'



const AuthContext  = createContext()


const AuthProvider = ({children}) => {

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = ()=> {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos.uid}`
            const { data } = await clienteAxios.put(url, datos, config)
            setAuth(data)
            setAlerta({
                msg: "Usuario editado correctamente"
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const [alerta, setAlerta] = useState({})

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                setAlerta,
                alerta
            }}
        >
            {children}
        </AuthContext.Provider>

    )

}


export {
    AuthProvider
}

export default AuthContext