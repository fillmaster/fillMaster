import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';
import ToggleScreens from './components/ToggleScreens';

const App = () => {
  return (
    <>
      <Header />
      <ToggleScreens />
      <StepMenu />
    </>
  );
};

export default App;
