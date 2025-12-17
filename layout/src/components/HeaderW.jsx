import { useState } from "react";

export default function HeaderW() {
  // default
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // html
  return (
    <header className="header">
      <h1>LOGO</h1>
      <nav>
        <ul className="menuList">
          <li
            className="menuItem"
            onMouseEnter={() => setHoveredMenu("home")}
            onMouseLeave={() => setHoveredMenu(null)}>
            Home
            {hoveredMenu === "home" && (
              <ul className="submenu">
                <li className="submenuItem">Main</li>
                <li className="submenuItem">Introduction</li>
              </ul>
            )}
          </li>
          <li
            className="menuItem"
            onMouseEnter={() => setHoveredMenu("notice")}
            onMouseLeave={() => setHoveredMenu(null)}>
            Notice
            {hoveredMenu === "notice" && (
              <ul className="submenu">
                <li className="submenuItem">NoticeList</li>
                <li className="submenuItem">News</li>
                <li className="submenuItem">Event</li>
              </ul>
            )}
          </li>
          <li
            className="menuItem"
            onMouseEnter={() => setHoveredMenu("gallery")}
            onMouseLeave={() => setHoveredMenu(null)}>
            Gallery
            {hoveredMenu === "gallery" && (
              <ul className="submenu">
                <li className="submenuItem">Photo</li>
                <li className="submenuItem">Video</li>
              </ul>
            )}
          </li>
          <li
            className="menuItem"
            onMouseEnter={() => setHoveredMenu("inquiry")}
            onMouseLeave={() => setHoveredMenu(null)}>
            Inquiry
            {hoveredMenu === "inquiry" && (
              <ul className="submenu">
                <li className="submenuItem">Inquiry</li>
                <li className="submenuItem">FAQ</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
