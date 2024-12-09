import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ProgramContextProvider} from './components/active-learn/ProgramContext';

const BMSelector = lazy(() => import('./pages/BMSelector'));
const ALRunner = lazy(() => import('./pages/ALRunner'));

const App = () => (
  /* Github 페이지 배포 시 */
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramContextProvider>
        <Routes>
          <Route path='/' element={<BMSelector/>}/>
          <Route path='/run' element={<ALRunner/>}/>
        </Routes>
      </ProgramContextProvider>
    </Suspense>
  </BrowserRouter>
)

export default App;
