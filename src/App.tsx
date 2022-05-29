import './App.css';
import MenuDrawer from './components/Menu';
import StepMenu from './components/StepMenu';

const App = () => {
  return (
    <>
      <header className="App-header">Fill Master</header>
      <StepMenu />
      <MenuDrawer />
    </>
  );
};

export default App;
