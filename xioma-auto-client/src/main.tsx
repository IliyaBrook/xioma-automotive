import router from '@src/pages/routes.tsx'
import store from '@src/store/store.ts'
import { GMAP_API_KEY } from '@src/utils/constants.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

const loadGoogleMapsAPI = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_API_KEY}&libraries=places`;
  script.async = true;
  document.head.appendChild(script);
};

loadGoogleMapsAPI();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
