import ToggleSwitch from "./ToggleSwitch";

const Header = () => {
  return (
    <>
      <header className="header bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
        <nav className="nav">
          <ul>
            <li className="nav-title">Where in The World?</li>
          </ul>

          <ul className="mode-toggle">
            <li>
              <ToggleSwitch />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
