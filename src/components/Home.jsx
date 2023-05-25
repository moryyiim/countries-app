// import React, { useState, useEffect } from "react";

// const Home = () => {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/data.json");
//         const data = await response.json();
//         setCountries(data);
//         setFilteredCountries(data);
//       } catch (error) {
//         console.error("Error fetching countries data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const filtered = countries.filter((country) => {
//       const searchTermMatch = country.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//       const regionMatch =
//         selectedRegion === "All" || country.region === selectedRegion;

//       return searchTermMatch && regionMatch;
//     });

//     setFilteredCountries(filtered);
//   }, [searchTerm, selectedRegion, countries]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     setSearchTerm(value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       setSearchTerm(searchInput);
//     }
//   };

//   const handleRegionChange = (e) => {
//     const region = e.target.value;
//     setSelectedRegion(region);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a country..."
//         value={searchInput}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//       />

//       <select value={selectedRegion} onChange={handleRegionChange}>
//         <option value="All">Filter by Region</option>
//         <option value="Africa">Africa</option>
//         <option value="Americas">Americas</option>
//         <option value="Asia">Asia</option>
//         <option value="Europe">Europe</option>
//         <option value="Oceania">Oceania</option>
//       </select>

//       <ul className="countries-list">
//         {filteredCountries.map((country) => (
//           <li key={country.alpha3Code}>
//             <img src={country.flag} alt={country.name} />
//             <div className="country-details">
//               <h2>{country.name}</h2>
//               <p>
//                 <strong>Population:</strong> {country.population}
//               </p>
//               <p>
//                 <strong>Region:</strong> {country.region}
//               </p>
//               <p>
//                 <strong>Capital:</strong> {country.capital}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchInput, setSearchInput] = useState("");

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
  }, []);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchInput(value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      return setSearchTerm(searchInput);
    }
  };

  const handleRegion = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
  };

  return (
    <>
      <input
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleSearch}
        type="text"
        placeholder="Search for a country..."
      />

      <select value={selectedRegion}>
        <option value="All">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default Home;
