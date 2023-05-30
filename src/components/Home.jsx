import { useState, useEffect } from "react";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // * Modal

  const openModal = (country) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Search Filters */}

      <div className="search-container bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out">
        <div className="search-wrapper">
          <div className="search-box">
            <input
              className="search-input"
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search for a country..."
            />
            <i className="fa fa-search"></i>
          </div>

          <div className="select-wrapper">
            <select
              className="region-filter cursor-pointer"
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
                onClick={() => openModal(country)}
              >
                <img
                  className="country-img"
                  src={country.flag}
                  alt={country.name}
                />
                <div className="country-details">
                  <h2 className="country-title text-[#111517] dark:text-[#ffffff]">
                    {country.name}
                  </h2>
                  <p>
                    <strong className="text-[#111517] dark:text-[#ffffff]">
                      Population:
                    </strong>
                    {country.population}
                  </p>
                  <p>
                    <strong className="text-[#111517] dark:text-[#ffffff]">
                      Region:
                    </strong>
                    {country.region}
                  </p>
                  <p>
                    <strong className="text-[#111517] dark:text-[#ffffff]">
                      Capital:
                    </strong>
                    {country.capital}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}

      {modalOpen && (
        <div className="lightbox bg-[#fafafa] dark:bg-[#202c37] transition duration-500 ease-in-out">
          <div className="lightbox-content">
            <button className="back-button" onClick={closeModal}>
              Back
            </button>
            <img
              className="lightbox-img"
              src={selectedCountry.flag}
              alt={selectedCountry.name}
            />
            <div className="lightbox-details">
              <h2 className="country-title">{selectedCountry.name}</h2>
              <p>
                <strong>Population:</strong> {selectedCountry.population}
              </p>
              <p>
                <strong>Region:</strong> {selectedCountry.region}
              </p>
              <p>
                <strong>Capital:</strong> {selectedCountry.capital}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
