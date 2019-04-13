import React from 'react' ;
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import {Container} from 'react-bootstrap';
import NavbarView from './NavbarView';

const { Header, Content, Footer } = Layout;

const CustomLayout = ( props ) => {
    /*return (
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3"><Link to="/carts">Shopping Cart</Link></Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                {props.children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    )*/
    return(
        <div>
            <NavbarView username={props.username}/>
                <div 
               // align="center"
                style={{ background: '#fff', 
                   // marginTop: 100,
                    marginTop: 100,
                    minHeight: 100,
                    alignContent: 'center' }}
                >
                    {props.children}
                </div>
        </div>

    )

}

export default CustomLayout ;

  