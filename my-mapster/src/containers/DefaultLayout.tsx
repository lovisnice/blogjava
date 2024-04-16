import {Outlet} from "react-router-dom";
import "./style.css"
import Header from "./Header.tsx";
import {Footer} from "antd/lib/layout/layout";


const DefaultLayout = () => {
    return (
       <div className={"app"}>
           <div className={"container"}>
               <Header/>
               <Outlet/>
               <Footer style={{ marginTop:'150px', textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by Ant UED</Footer>
           </div>
       </div>
    );
};

export default DefaultLayout;
