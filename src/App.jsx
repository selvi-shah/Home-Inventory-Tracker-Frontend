import { BrowserRouter } from 'react-router-dom'
import AddItem from './pages/AddItem.jsx';
import ItemList from './pages/ItemList.jsx';
import './App.jsx'
import HeroSection from './components/HeroSection.jsx'
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [refresh, setRefresh] = useState(false);

  return (
    <BrowserRouter>

      <HeroSection />

      <AddItem
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <ItemList
        refresh={refresh}
      />
      <ToastContainer />

    </BrowserRouter>
  )
}

export default App;
