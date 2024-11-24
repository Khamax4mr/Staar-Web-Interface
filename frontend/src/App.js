import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const BMSelector = lazy(() => import('./pages/BMSelector'));

const App = () => (
  /* Github 페이지 배포 시 */
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<BMSelector/>}/>
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default App;