
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from "./components/Footer/Footer";
import Menu from './components/Menu/Menu';
import MenuList from './components/MenuList/MenuList';
import { Route,Routes } from 'react-router-dom';
import Admin from './components/Admin/Admin.jsx';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<><Header /><Menu/><MenuList/><Footer/></>} />
      <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
