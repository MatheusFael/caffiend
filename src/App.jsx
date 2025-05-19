import  Layout from "./components/Layout"
import Hero from "./components/Hero"
import CoffeForm from "./components/CoffeForm"
import Stats from "./components/Stats"
import History from "./components/History"
import { useAuth } from "./context/AuthContext"


function App() {
  const { globalUser, isLoading, globalData } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData &&  !!Object.keys(globalData || {}).length

  const authenticateContent = (
    <>
      <Stats />
      <History />
    </>
  )
  
  return (
    <Layout>
        <Hero />
        <CoffeForm  isAuthenticated={isAuthenticated} />
        {(isLoading && isAuthenticated ) && (<p>Loading...</p>)}
        {(isAuthenticated && isData)  && (authenticateContent)}
    </Layout>
  )
}

export default App



