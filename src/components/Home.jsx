import { useState, useEffect } from "react";

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
        console.log("Error fetching country data: error");
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
      <div class="search-filter">
        <div class="search-box">
          <input
            class="search-input"
            value={searchInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search for a country..."
          />
          <i class="fa fa-search"></i>
        </div>

        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="All">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="countries-container">
        <ul className="countries-list">
          {filteredCountries.map((country) => (
            <li key={country.alpha3Code}>
              <img
                class="countries-img"
                src={country.flag}
                alt={country.name}
              />
              <div className="country-details">
                <h2>{country.name}</h2>
                <p>
                  <strong>Population:</strong>
                  {country.population}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
