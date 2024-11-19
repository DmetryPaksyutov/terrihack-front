import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  BulbOutlined, 
  SearchOutlined, 
  FileAddOutlined, 
  ApiOutlined, 
  LoginOutlined,
  MenuOutlined 
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import st from "./Navbar.module.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const isMobile = useMediaQuery({ maxWidth: 577 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Header className={st.header}>
            <div className={st.logo}>FindWork</div>

            {isMobile ? (
                <>
                    <Button 
                        className={st.burgerButton} 
                        type="primary" 
                        icon={<MenuOutlined />} 
                        onClick={toggleMenu}
                    />
                    {isMenuOpen && (
                        <Menu theme="dark" mode="vertical" className={st.mobileMenu}>
                            <Menu.Item key="home" icon={<BulbOutlined />}>
                                <Link to={'/'}>умный поиск</Link>
                            </Menu.Item>
                            <Menu.Item key="/find" icon={<SearchOutlined />}>
                                <Link to={'/find'}>поиск</Link>
                            </Menu.Item>
                            <Menu.Item key="upload" icon={<FileAddOutlined />}>
                                <Link to={'/upload'}>загрузка</Link>
                            </Menu.Item>
                            <Menu.Item key="integration" icon={<ApiOutlined />}>
                                <Link to={'/integration'}>интеграция</Link>
                            </Menu.Item>
                            <Menu.Item key="login" icon={<LoginOutlined />}>
                                <Link to={'/login'}>Войти</Link>
                            </Menu.Item>
                        </Menu>
                    )}
                </>
            ) : (
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} className={st.menu}>
                    <Menu.Item key="home" icon={<BulbOutlined />}>
                        <Link to={'/'}>умный поиск</Link>
                    </Menu.Item>
                    <Menu.Item key="/find" icon={<SearchOutlined />}>
                        <Link to={'/find'}>поиск</Link>
                    </Menu.Item>
                    <Menu.Item key="upload" icon={<FileAddOutlined />}>
                        <Link to={'/upload'}>загрузка</Link>
                    </Menu.Item>
                    <Menu.Item key="integration" icon={<ApiOutlined />}>
                        <Link to={'/integration'}>интеграция</Link>
                    </Menu.Item>
                </Menu>
            )}
            
            {!isMobile && (
                <Button type="primary" icon={<LoginOutlined />}>
                    <Link to={'/login'}>Войти</Link>
                </Button>
            )}
        </Header>
    );
};

export default Navbar;