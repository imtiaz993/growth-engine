import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  console.log("windows", window.location.pathname);
  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden py-[5px] h-[calc(100vh-80px)]">
      <Sider width={256} className="">
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          className="!text-xs"
          defaultOpenKeys={["sub1", "sub2"]}
          style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={[
            window.location.pathname === "/ua"
              ? "1"
              : window.location.pathname === "/ua/campaign"
              ? "2"
              : window.location.pathname === "/ua/creative"
              ? "3"
              : window.location.pathname === "/product/install"
              ? "5"
              : window.location.pathname === "/product/cohort"
              ? "6"
              : window.location.pathname === "/product/player"
              ? "7"
              : "1",
          ]}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                {/* <Icon type="user" /> */}
                <HomeOutlined className="mr-2" />
                UA Dashboard
              </span>
            }
          >
            <Menu.Item key="1">
              <NavLink to="/ua">Overview</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/ua/campaign">Campaign</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/ua/creative">Creative</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <MailOutlined className="mr-2" />
                Product Dashboard
              </span>
            }
          >
            <Menu.Item key="5">
              <NavLink to="/product/install">Install</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/product/cohort">Cohort </NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/product/player">Player</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
