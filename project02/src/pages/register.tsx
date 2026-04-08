import { useState  } from "react";
import type { FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await createUserWithEmailAndPassword( auth, email, password)
            navigate("/dashboard")
        } catch(error: unknown){
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("Ocurrio un error")
            }
        }
    }

    return (
       <form onSubmit={handleRegister}>
      <h2>Registro de usuario</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Registrarse</button>
    </form>
  )
}

export default Register