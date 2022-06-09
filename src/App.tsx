import './App.css';
import Header from './components/Header';
import StepMenu from './components/StepMenu';
import PatternMaker from './utils/classes/patternMaker';

const App = () => {
  const patternMaker = PatternMaker.getInstance();
  console.log('patternMaker instance initiated');
  return (
    <>
      <Header />
      <StepMenu patternMaker={patternMaker} />
    </>
  );
};

export default App;
