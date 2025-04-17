import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UsuarioForm from './pages/UsuarioForm'
import UsuarioLista from './pages/UsuarioLista'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AgendamentoForm from './pages/AgendamentoForm'
import AgendamentoLista from './pages/AgendamentoLista'
import Login from './pages/Login'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const AuthRota = ({component: Component}) =>{
  const { usuarioId } = useContext(AuthContext);
  return usuarioId ? <Component /> : <Navigate to="/"/>
}

function App() {

  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path="/"  element={<Login />}/>
          <Route path="/home"  element={<Home />}/>
          <Route path="/usuarios"  element={<AuthRota component={UsuarioLista}/>}/>
          <Route path="/cadastro-usuario"  element={<AuthRota component={UsuarioForm}/>}/>
          <Route path="/edicao-usuario/:id"  element={<AuthRota component={UsuarioForm}/>}/>
          <Route path="/cadastro-agendamento"  element={<AuthRota component={AgendamentoForm}/>}/>
          <Route path="/agendamentos"  element={<AuthRota component={AgendamentoLista}/>}/>
        </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
