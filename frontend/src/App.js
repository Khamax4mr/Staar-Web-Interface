import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ProgramContextProvider} from './components/active-learn/ProgramContext';

const BMSelector = lazy(() => import('./pages/BMSelector'));

const App = () => (
  /* Github 페이지 배포 시 */
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramContextProvider>
        <Routes>
          <Route path='/' element={<BMSelector/>}/>
        </Routes>
      </ProgramContextProvider>
    </Suspense>
  </BrowserRouter>
)

export default App;