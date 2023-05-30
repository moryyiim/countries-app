import { useState, useEffect } from "react";

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <>
      <button
        className="toggle-switch text-[#111517] dark:text-[#ffffff]"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? (
          <i className="fa-solid fa-moon mr-2 dark:fill-[#ffffff]"></i>
        ) : (
          <i className="fa-regular fa-moon mr-2"></i>
        )}
        Dark Mode
      </button>
    </>
  );
};

export default ToggleSwitch;
