import { BrowserRouter } from 'react-router-dom'
import AddItem from './pages/AddItem.jsx';
import ItemList from './pages/ItemList.jsx';
import './App.jsx'
import HeroSection from './components/HeroSection.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeroSection />
      <AddItem />
      <ItemList />
    </BrowserRouter>
      
    </>
  )
}

export default App
