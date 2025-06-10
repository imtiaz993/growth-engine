import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";

const Sidebar = () => {
  return (
    <div>
      <Sider width={250} className="ml-2 bg-white">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
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
            <Menu.Item key="1">Overview</Menu.Item>
            <Menu.Item key="2">Campaign</Menu.Item>
            <Menu.Item key="3">Creative</Menu.Item>
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
            <Menu.Item key="5">Install</Menu.Item>
            <Menu.Item key="6">Cohort</Menu.Item>
            <Menu.Item key="7">Player</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
