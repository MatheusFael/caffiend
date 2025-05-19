import { use, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistering, setIsRegistering] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const { signup, login } = useAuth()
    const [error, setError] = useState(null)
    async function handleAuthenticate() {
        if (!email || !email.includes("@") || !password || password.length < 6 || isAuthenticating) {
            return
        }

        try {
            setIsAuthenticating(true)
            setError(null)
            if (isRegistering) {
                await signup(email, password)
            } else {
                await login(email, password)
            }
            handleCloseModal()
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setIsAuthenticating(false)
        }




    }


    return (
        <>
            <h2 className="sign-up-next">{isRegistering ? "Sign Up" : "Login"}</h2>
            <p>{isRegistering ? "Create an account!" : "Sign in to your account!"}</p>
            {error && (
                <p>❌ {error}</p>
               
            )}
            {console.log(error)}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" name="" id="" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*********" name="" id="" />
            <button onClick={handleAuthenticate}> <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistering ? "Already have an account?" : "Don't have an account?"}</p>
                <button onClick={() => {
                    setIsRegistering(!isRegistering)
                }} ><p>{isRegistering ? "Sign in" : "Sign    up"} </p></button>
            </div>
        </>
    )
}