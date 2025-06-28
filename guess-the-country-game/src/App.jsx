import './App.css'
import Game from './Components/Game/Game'
import LoginPage from './Components/loginPage/LoginPage'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Router> 
      <Routes> 
        <Route path='/' element={<LoginPage />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </Router>
    </>

  )
}

export default App
