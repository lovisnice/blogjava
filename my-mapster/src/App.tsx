import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout.tsx";
import PostCreatePage from "./admin/posts/create/PostCreatePage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route/>
            </Route>
            <Route path={"/admin"}>
                <Route path={"post"}>
                    <Route path={"create"} element={<PostCreatePage/>} />
                </Route>
            </Route>
        </Routes>
    </>
  )
}

export default App
