import './App.css';
import SignUp from './components/SignUp/SignUp';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Auth from './components/Auth/Auth';
import { Route, Routes } from 'react-router-dom';

function App() {
  //todo: добавлять роутинг при создании компонентов
  return (
    <>
      <HeaderMenu />
      <Routes>
        <Route path="user">
          <Route path="registration" element={<SignUp />} />
          <Route path="authorization" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
