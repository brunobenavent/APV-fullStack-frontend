
const Login = () => {
  return (
    <> 
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div>
          <form action="">
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
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 md:w-auto"
            />
          </form>
        </div>
    </>
  )
}

export default Login