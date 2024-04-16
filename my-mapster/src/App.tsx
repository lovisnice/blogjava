import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout.tsx";
import PostCreatePage from "./admin/posts/create/PostCreatePage.tsx";
import PostList from "./views/Home/PostList.tsx";
import Write from "./views/WritePost/Write.tsx";
import Login from "./views/Login";
import Register from "./views/Register";
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";
//import "/containers/style.css"

function App() {

    const admin = getLocalStorage('roles');

  return (
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route index element={<PostList/>} />
                <Route path={"login"} element={<Login/>}/>
                <Route path={"register"} element={<Register/>}/>
            </Route>
            {admin === 'admin'
                &&
            <Route path={"/admin"} element={<DefaultLayout/>}>
                <Route path={"post"} element={<PostList/>} />
                <Route path={"create"} element={<PostCreatePage/>} />
                <Route path={"write"} element={<Write/>}/>
            </Route>
            }

        </Routes>
  )
}

export default App
