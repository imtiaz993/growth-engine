import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import { NavLink, useLocation } from "react-router-dom";

const routes = [
  {
    key: "sub1",
    title: "UA Dashboard",
    icon: <HomeOutlined className="mr-2" />,
    paths: ["/ua/overview", "/ua/campaign", "/ua/creative"],
    items: [
      { key: "1", path: "/ua/overview", label: "Overview" },
      { key: "2", path: "/ua/campaign", label: "Campaign" },
      { key: "3", path: "/ua/creative", label: "Creative" },
    ],
  },
  {
    key: "sub2",
    title: "Product Dashboard",
    icon: <MailOutlined className="mr-2" />,
    paths: ["/product/install", "/product/cohort", "/product/player"],
    items: [
      { key: "5", path: "/product/install", label: "Install" },
      { key: "6", path: "/product/cohort", label: "Cohort" },
      { key: "7", path: "/product/player", label: "Player" },
    ],
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const getDefaultOpenKeys = () => {
    const openKeys = routes
      .filter((route) => route.paths.includes(pathname))
      .map((route) => route.key);
    return openKeys.length > 0 ? openKeys : ["sub1"];
  };
  const getDefaultSelectedKeys = () => {
    for (const route of routes) {
      const selectedItem = route.items.find((item) => item.path === pathname);
      if (selectedItem) return [selectedItem.key];
    }
    return ["1"];
  };
  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden py-[5px] h-[calc(100vh-80px)]">
      <Sider width={256} className="">
        <Menu
          mode="inline"
          className="!text-xs"
          defaultOpenKeys={getDefaultOpenKeys()}
          style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={getDefaultSelectedKeys()}
        >
          {routes.map((route) => (
            <SubMenu
              key={route.key}
              title={
                <span>
                  {route.icon}
                  {route.title}
                </span>
              }
            >
              {route.items.map((item) => (
                <Menu.Item key={item.key}>
                  <NavLink to={item.path}>{item.label}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
