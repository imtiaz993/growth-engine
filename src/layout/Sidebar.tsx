import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, useLocation } from "react-router-dom";

const routes = [
  {
    key: "sub1",
    title: "UA Dashboard",
    icon: <HomeOutlined className="mr-2" />,
    path: "/ua/overview",
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

  const getDefaultOpenKeys = (): string[] => {
    const match = routes.find((route) => route.paths?.includes(pathname));
    return match ? [match.key] : [];
  };

  const getDefaultSelectedKeys = (): string[] => {
    for (const route of routes) {
      if (route.items) {
        const found = route.items.find((item) => item.path === pathname);
        if (found) return [found.key];
      } else if (route.path === pathname) {
        return [route.key];
      }
    }
    return [];
  };

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden py-[5px] h-[calc(100vh-80px)]">
      <Sider width={256}>
        <Menu
          mode="inline"
          className="!text-xs"
          defaultOpenKeys={getDefaultOpenKeys()}
          defaultSelectedKeys={getDefaultSelectedKeys()}
          style={{ height: "100%", borderRight: 0 }}
        >
          {routes.map((route) =>
            route.items ? (
              <Menu.SubMenu
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
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={route.key} icon={route.icon}>
                <NavLink to={route.path}>{route.title}</NavLink>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
