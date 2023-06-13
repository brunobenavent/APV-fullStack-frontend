import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Footer from "../components/Footer"
import Header from "../components/Header"

const RutaProtegida = () => {

  const { auth, cargando } = useAuth()
  if (cargando) return 'cargando…'
  
  return (
    <>
      <Header />
        {auth?.uid ? (
            <main className="container mx-auto mt-20">

              <Outlet/>
            </main>
        ): <Navigate to='/'/>}
      <Footer />
    </>
  )
}

export default RutaProtegida
