import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./styles/style.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { myRoutes } from "./Routes";


function App() {
  return (
        <div className="App flex flex-jc-c">
            <BrowserRouter>
                <Routes>
                  {myRoutes.map((route, i) => {
                    return <Route key={i} path={route.path} element={route.element}/>
                  })}
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
