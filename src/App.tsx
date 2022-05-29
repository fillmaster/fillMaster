import './App.css';
import TemporaryDrawer from './components/Menu';
import StepMenu from './components/StepMenu';

const App = () => {
  return (
    <>
      <header className="App-header">Fill Master</header>
      <StepMenu />
      <TemporaryDrawer />
    </>
  );
};

export default App;
