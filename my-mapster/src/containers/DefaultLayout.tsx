
import {Layout, theme} from 'antd';
import {Content, Header} from "antd/es/layout/layout";

const DefaultLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' , minWidth:'100vw'}}>
            <Layout>
                <Header style={{display: 'flex', alignItems: 'center'}}>
                <h1>Hello world!</h1>
                </Header>
                <Layout
                    style={{display: 'flex', alignItems: 'center', padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                <Content>
                    <h1>Hello world!</h1>
                </Content>
                </Layout>
               </Layout>
        </Layout>
    );
};

export default DefaultLayout;
