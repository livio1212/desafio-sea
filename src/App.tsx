import './App.css'
import Header from "./components/Header/Header";
import MainForm from './components/Forms/MainForm';
import MenuLateral from './components/MenuLateral/MenuLateral';
import { Button } from "antd";
import EmBreve from './components/EmBreve/EmBreve';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [activePage, setActivePage] = useState("form")
  const isStepCompleted = useSelector((state: RootState) => state.step.isCompleted);
  const [activeHeaderItem, setActiveHeaderItem] = useState(0);
  const [showEmBreve, setShowEmBreve] = useState(false);

  const handleHeaderItemClick = (index: number) => {
    setActiveHeaderItem(index);
    if (index === 0) {
      setShowEmBreve(false);
    } else {
      setShowEmBreve(true);
    }
  };

  const handleMenuItemClick = (page: string) => {
    setActivePage(page);
    setShowEmBreve(false);
    setActiveHeaderItem(0);
  };

  const handleNextStep = () => {
    if (activeHeaderItem < 8) {
      setActiveHeaderItem(activeHeaderItem + 1);
      setShowEmBreve(true);
    }
  };


  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div className='menuLateral' style={{ position: 'fixed' }}>
        <MenuLateral activePage={activePage} setActivePage={handleMenuItemClick} />

      </div>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div className='main'>
          {activePage === 'form' ? (
            <>
              <Header isStepCompleted={isStepCompleted} activeHeaderItem={activeHeaderItem} setActiveHeaderItem={handleHeaderItemClick} />
              {showEmBreve ? <EmBreve marginStyle='320px' /> : <MainForm />}
              <div className='nextStep'>
                <Button disabled={!isStepCompleted || activeHeaderItem === 8} onClick={handleNextStep}>Próximo Passo</Button>
              </div>
            </>
          ) : (
            <EmBreve marginStyle='700px' />
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App
