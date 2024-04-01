import './App.css'
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"}>
                <Route/>
            </Route>
            <Route path={"/admin"}>

            </Route>
        </Routes>
    </>
  )
}

export default App
