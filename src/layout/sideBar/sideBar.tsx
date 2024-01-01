import { useEffect, useState } from "react";
import "./sideBar.css";
import WindIcon from "../../assets/icons/3D/windIcon3D";
import SunnyCloudyIcon from "../../assets/icons/sunnyCloudyIcon";
import FavoritesIcon from "../../assets/icons/favoritesIcon";
import { sideBarConfig } from "./config/sideBar.config";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setChangeMode } from "../../redux/features/switchMode";

const Sidebar = () => {
  const favorite = <FavoritesIcon />;
  const sunnyCloudyIcon = <SunnyCloudyIcon />;
  const icons = [sunnyCloudyIcon, favorite];
  const dispatch = useAppDispatch();
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  const handleSwitchChange = () => {
    setIsLightMode((prevMode) => !prevMode);
    document.body.classList.toggle("light-mode");
  };

  useEffect(() => {
    dispatch(setChangeMode(isLightMode))
  }, [isLightMode])
  
  return (
    <nav className={`side-bar-wrapper ${isLightMode ? 'light-mode' : ''}`}>
      <div className="wind-icon">
        <Link to={"/"}>
          <WindIcon width={50} height={50} />
        </Link>
      </div>
      <ul className="nav flex-column">
        {sideBarConfig.map((item, index) => (
          <li key={index} className="icons-style">
            <NavLink to={item.route}>
              <span className="d-flex justify-content-center align-items-center">
                {icons[item.icon]}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className="buttonSwitch">
            <label className="switch">
                <span className={`sun ${isLightMode ? 'active' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                <span className={`moon ${isLightMode ? 'active' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
                <input type="checkbox" className="input" onChange={handleSwitchChange}/>
                <span className="slider"></span>
            </label>
        </li>
      </ul>
      
    </nav>
  );
};

export default Sidebar;
