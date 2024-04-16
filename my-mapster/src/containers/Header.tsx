
import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png";
import "./header.css"
import ButtonGroup from "antd/es/button/button-group";
import {Avatar, Button} from "antd";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {logout} from "../store/accounts/accounts.slice.ts";
import {UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {getLocalStorage} from "../utils/storage/localStorageUtils.ts";
const Header = () => {

    //const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {isLogin, user} = useAppSelector(state => state.account);
    const admin = getLocalStorage('roles');


    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link className="link" to={"/"} onClick={()=>navigate("/")} >
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">

                    {admin === 'admin'
                    &&
                        <Button style={{alignItems:'center'}} className="link" onClick={()=>navigate("/admin/write")}>
                            Write
                        </Button>
                    }




                    {isLogin ? (
                        <ButtonGroup size="large" >
                            <Button
                                type="primary"
                                style={{ display: 'flex' ,backgroundColor: 'lightgreen' }}
                                icon={<Avatar size="small" />}
                            >
                                {user?.name}
                            </Button>
                            <Button
                                style={{backgroundColor: 'lightgreen' }}
                                type="primary"
                                icon={<PoweroffOutlined />}
                                onClick={() => handleLogout()}
                            />
                        </ButtonGroup>
                    ) : (
                        <Link to="/login" style={{ color: 'lightgreen', textDecoration: 'none' }}>
                            <Button type="primary" icon={<UserOutlined />} style={{backgroundColor:"lightgreen"}}>
                                Увійти
                            </Button>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Header;