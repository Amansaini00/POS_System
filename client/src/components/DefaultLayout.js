import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  CopyOutlined,
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems /*loading*/ } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //to get local storage data
  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      {/* {loading && <Spinner></Spinner>} */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" id="demo">
          <h1 className="text-center text-loght font-wight-bold mt-4">POS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <MenuItem key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">bills</Link>
          </MenuItem>
          <MenuItem key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">items</Link>
          </MenuItem>
          <MenuItem key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">customers</Link>
          </MenuItem>
          <MenuItem
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            <Link to="/logout">logout</Link>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="cart-item" onClick={() => navigate("/cart")}>
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined id="cart" />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
