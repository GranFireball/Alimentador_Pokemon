import './App.css';
import Home from './views/home';
import Jogar from './views/jogar';
import Alimentar from './views/alimentar';
import Ranking from './views/ranking';
import { Navigate, Route, Routes } from 'react-router-dom';
import UsuarioProvider from './context/usuarioProvider';
import Login from './views/login';
import Cadastrar from './views/cadastrar';

function App() {
  return (
    <UsuarioProvider>
      <Routes>
        <Route path='/'>
          <Route index element={<Login/>} />
          <Route path='cadastrar' element={<Cadastrar/>} />
        </Route>
        <Route path='/inicio'>
          <Route index element={<Home/>} />
          <Route path='jogar' element={<Jogar/>} />
          <Route path='alimentar' element={<Alimentar/>} />
          <Route path='ranking' element={<Ranking/>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </UsuarioProvider>
  );
}

export default App;
