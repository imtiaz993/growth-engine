import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// ✅ Only flat-level UA and Product dashboards, no dropdowns
const routes = [
  {
    key: "ua",
    title: "UA Dashboard",
    icon: <HomeOutlined className="mr-2" />,
    path: "/ua/overview",
  },
  {
    key: "product",
    title: "Product Dashboard",
    icon: <AppstoreOutlined className="mr-2" />,
    path: "/product/overview",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const getOpenKeys = (): string[] => {
    const match = routes.find((route) => route.path === pathname);
    return match ? [match.key] : [];
  };

  const getSelectedKeys = (): string[] => {
    const route = routes.find((r) => r.path === pathname);
    return route ? [route.key] : [];
  };

  useEffect(() => {
    setOpenKeys(getOpenKeys());
  }, [pathname]);

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden py-[5px] h-[calc(100vh-80px)]">
      <Sider width={256}>
        <Menu
          mode="inline"
          className="!text-xs"
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          selectedKeys={getSelectedKeys()}
          style={{ height: "100%", borderRight: 0 }}
        >
          {routes.map((route) => (
            <Menu.Item key={route.key} icon={route.icon}>
              <NavLink to={route.path}>{route.title}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
