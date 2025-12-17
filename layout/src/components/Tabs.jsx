import { useState } from "react";

export default function Tabs() {
  // default
  const [tab, setTab] = useState("notice");

  // html
  return (
    <div>
      {/* btn */}
      <div className="tabsBtns">
        <button
          onClick={() => setTab("notice")}
          className={`tabBtn ${tab === "notice" ? "tabBtnActive" : ""}`}>
          Notice
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`tabBtn ${tab === "gallery" ? "tabBtnActive" : ""}`}>
          Gallery
        </button>
      </div>
      {/* contents */}
      {tab === "notice" && (
        <ul>
          <li>Notice 1</li>
          <li>Notice 2</li>
          <li>Notice 3</li>
          <li>Notice 4</li>
        </ul>
      )}
      {tab === "gallery" && (
        <ul className="galleryGrid">
          <img src="https://picsum.photos/100" alt="g1" />
          <img src="https://picsum.photos/101" alt="g2" />
          <img src="https://picsum.photos/102" alt="g3" />
        </ul>
      )}
    </div>
  );
}
