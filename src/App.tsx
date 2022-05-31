import './App.css';
import Header from './components/Header';
import MenuOptions from './components/Menu';
import StepMenu from './components/StepMenu';

const App = () => {
  return (
    <>
      <Header />
      <header className="App-header">Fill Master</header>
      <MenuOptions />
      <StepMenu />
    </>
  );
};

export default App;
