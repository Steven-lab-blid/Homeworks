import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase/config"

export function useAuth() {
  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)

  const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  return { login, register, logout }
}