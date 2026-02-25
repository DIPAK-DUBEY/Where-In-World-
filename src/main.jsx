import { createRoot } from 'react-dom/client'
import '/index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import SingleCountry from './Components/SingleCountry.jsx'
import BorderCountry from './Components/BorderCountry.jsx'
import ByRegion from './Components/ByRegion.jsx'
import ThemeSync from './Components/ThemeSync.jsx'
import SmoothScrolling from "./Components/Scrolling";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/Country/:id',
      element: <SingleCountry />
    },
    {
      path: '/Border/:code',
      element: <BorderCountry />
    },
    {
      path: '/Region/:region',
      element: <ByRegion />,
    },
    {
      path: '/Region/:region/Country/:id',
      element: <SingleCountry />   
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <>
    <ThemeSync />
    <SmoothScrolling />
    <RouterProvider router={router} />
  </>

)

