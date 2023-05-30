import ToggleSwitch from "./ToggleSwitch";

const Header = () => {
  return (
    <>
      <header class="header bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
        <nav class="nav">
          <ul>
            <li class="title">Where in The World?</li>
          </ul>

          <ul>
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
