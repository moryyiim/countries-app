import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  //   * Fetch data from the data.json file so we can render to the page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.log("Error fetching country data: error", err);
      }
    };

    fetchData();
  }, []);

  //   * Filtering out countries that match

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const searchTermMatch = country.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const regionMatch =
        selectedRegion === "All" || country.region === selectedRegion;

      return searchTermMatch & regionMatch;
    });
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  // * Renders the data on each key stroke

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchInput(value);
  };

  //   * Handles rendering data from the search bar

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      return setSearchTerm(searchInput);
    }
  };

  //   * Handles region change for drop down menu

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
  };

  return (
    <>
      {/* Search Filters */}

      <div
        id="top"
        className="search-container bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out"
      >
        <div className="search-wrapper">
          <div className="search-box">
            <input
              className="search-input bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out"
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search for a country..."
            />
            <i className="fa fa-search dark:text-white transition duration-500 ease-in-out"></i>
          </div>

          <div className="select-wrapper">
            <select
              className="region-filter cursor-pointer bg-[#ffffff] dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="All">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </div>
      </div>

      {/* Countries */}

      <div className="countries-container bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out">
        <div className="countries-wrapper bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out">
          <ul className="countries-list bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out">
            {filteredCountries.map((country) => (
              <li
                className="country-card bg-[#ffffff] dark:bg-[#2b3945] transition duration-500 ease-in-out cursor-pointer"
                key={country.alpha3Code}
              >
                <Link to={`/country/${country.alpha3Code}`}>
                  <img
                    className="country-img"
                    src={country.flag}
                    alt={country.name}
                  />

                  <div>
                    <h2 className="country-title text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
                      {country.name}
                    </h2>
                  </div>

                  <div className="country-details">
                    <p className="text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
                      <b>Population: </b>
                      {country.population}
                    </p>
                    <p className="text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
                      <b>Region: </b>
                      {country.region}
                    </p>
                    <p className="text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
                      <b>Capital: </b>
                      {country.capital}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
