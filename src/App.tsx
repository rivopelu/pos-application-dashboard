import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {routesList} from "./routes/route-list.ts";
import BasePage from "./components/BasePage.tsx";
function App(): JSX.Element {
  return (
    <div className={'bg-slate-100 min-h-screen'}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {routesList.map((item) => {
          const Element = item.element
          return (
            <Route
              path={item.routes}
              key={item.routes}
              element={
                <BasePage type={item.type}>
                  <Element />
                </BasePage>
              }
            />
          )
        })}
      </Routes>
    </div>
  )
}

export default App
