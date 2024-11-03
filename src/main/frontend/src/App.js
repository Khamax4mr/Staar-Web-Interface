import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Builder from './pages/active-learn/Builder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Builder/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;