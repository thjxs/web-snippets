import { RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import router from './router';

function App() {
  return (
    <Suspense fallback="">
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
