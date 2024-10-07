import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AnomalyScreen from "./pages/AnomalyScreen";
import FacesScreen from "./pages/FacesScreen";
import Control from "./pages/Control/Control";
import MapPage from "./pages/MapPage";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Guide from "./pages/FutureDev/Guide";
import { useStateContext } from "./contexts/ContextProvider";
import { Layout, Menu } from "antd";
import { sidebarLinksFa,sidebarLinksEng } from "./utils/sidebarLinks";
import HeaderCreatorComponent from "./components/header/HeaderCreatorComponent";
import PlatesScreen from "./pages/PlatesScreen";
import { colorPalette } from "./utils/colors";
import TrackingStaff from "./pages/FutureDev/TrackingStaff";
import DroneDetection from "./pages/FutureDev/DroneDetection";
import LeftoverDetection from "./pages/FutureDev/LeftoverDetection";
import { RecoilRoot } from "recoil";
import VehicleModelScreen from "./pages/VehicleModelScreen";

const { Header, Sider, Content } = Layout;

const logo = {
  dark: '/logo_light.png',
  light:'/logo_light.png'
};

const App = () => {
  const { login, theme, sidebarCollapsed ,lang} = useStateContext();
  const navigate = useNavigate();

  return (
    <RecoilRoot>
    <Layout className="h-screen w-screen fixed ">
      <Sider
      key={1}
        theme="light"
        hidden={!login}
        collapsible
        collapsed={sidebarCollapsed}
      >
        <div key={2} className="flex p-4 pb-8">
          <img
            src={theme === "light" ? logo.light : logo.dark}
            alt="سامانه پایش"
          />
        </div>
        <Menu key={3}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={lang === 'eng'?sidebarLinksEng:sidebarLinksFa}
          onClick={e => {
            if(lang==='eng'){
            sidebarLinksEng.forEach((item, index) => {
              if (item.key === e.key) {
                navigate(item.linkto);
              }
            })
          }else if(lang==='fa'){
            sidebarLinksFa.forEach((item, index) => {
              if (item.key === e.key) {
                navigate(item.linkto);
              }
            })
          }
          }}
        />
      </Sider>

      <Layout key={4} className="site-layout bg-main-bg dark:bg-main-dark-bg">
        {login &&
          <Header key={5}
            className="w-full"
            hidden={!login}
            style={{
              background: theme === "dark" ? colorPalette.c1 : colorPalette.c3
            }}
          >
            <HeaderCreatorComponent />
          </Header>}
        <Content key={6} className="">
          <div className="h-full w-full scroll-auto">
            <Routes>
              <Route key={1} path="/" element={<Login />} />
              <Route key={2} path="/login" element={<Login />} />
              <Route key={3} path="/anomaly" element={<AnomalyScreen />} />
              <Route key={4} path="/faces" element={<FacesScreen />} />
              <Route key={5} path="/plates" element={<PlatesScreen />} />
              <Route key={6} path="/control" element={<Control />} />
              <Route key={7} path="/map" element={<MapPage />} />
              <Route key={8} path="/reports" element={<Reports />} />
              <Route key={9} path="/settings" element={<Settings />} />
              <Route key={10} path="/guide" element={<Guide />} />
              <Route key={10} path="/tracking_staff" element={<TrackingStaff />} />
              <Route key={10} path="/drone_detection" element={<DroneDetection />} />
              <Route key={10} path="/leftover_detection" element={<LeftoverDetection />} />
              <Route key={5} path="/vehicle_model" element={<VehicleModelScreen />} />

            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
    </RecoilRoot>
  );
};

export default App;
