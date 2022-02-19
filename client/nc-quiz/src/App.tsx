import './App.css';
import SignUp from './components/SignUp/SignUp';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Auth from './components/Auth/Auth';
import { Route, Routes } from 'react-router-dom';
import CurrentQuiz from './components/Quiz/Quiz';
import Quiz from './components/Quiz/Quiz';
import AddQuiz from './components/AddQuiz/AddQuiz';
import ListQuiz from './components/ListQuiz/ListQuiz';

function App() {
  //todo: добавлять роутинг при создании компонентов
  return (
    <>
      <HeaderMenu />
      <Routes>
        <Route path="" element={<ListQuiz />} />
        <Route path="quiz">
          <Route path="create" element={<AddQuiz />} />
        </Route>
        <Route path="user">
          <Route path="registration" element={<SignUp />} />
          <Route path="authorization" element={<Auth />} />
          <Route path="myquiz" element={<ListQuiz />} />
        </Route>
        <Route path="quiz/:id" element={<CurrentQuiz />} />
      </Routes>
    </>
  );
}

export default App;
