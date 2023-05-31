import { Link, useParams } from "react-router-dom";
import data from "../data/data";

const Country = () => {
  const { id } = useParams();
  const country = data.find((country) => country.alpha3Code === id);

  if (!country) {
    return <div>Country Not Found</div>;
  }

  return (
    <>
      <div className="modal bg-[#fafafa] dark:bg-[#202c37] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
        <div className="button-container">
          <button className="back-button dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i>
              Back
            </Link>
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-img-container">
            <img className="modal-img" src={country.flag} alt={country.name} />
          </div>

          <div className="modal-details">
            <h2 className="modal-country-title">{country.name}</h2>

            <div className="modal-country-details">
              <div className="details-left">
                <p>
                  <strong>Native Name: </strong> {country.nativeName}
                </p>
                <p>
                  <strong>Population: </strong>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Region: </strong> {country.region}
                </p>
                <p>
                  <strong>Sub Region: </strong> {country.subregion}
                </p>
                <p>
                  <strong>Capital: </strong> {country.capital}
                </p>
              </div>

              <div className="details-right">
                <p>
                  <strong>Top Level Domain: </strong>
                  {country.topLevelDomain}
                </p>
                <p>
                  <strong>Currencies: </strong>
                  {country.currencies
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {country.languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="border-countries-container">
              <strong className="border-countries-title">
                Border Countries:
              </strong>
              <div className="border-countries">
                {country &&
                  country.borders &&
                  country.borders.map((borderCode) => {
                    const borderCountry = data.find(
                      (country) => country.alpha3Code === borderCode
                    );
                    if (borderCountry) {
                      return (
                        <Link
                          to={`/country/${borderCountry.alpha3Code}`}
                          className="border-country dark:bg-[#2b3945] text-[#111517] dark:text-[#ffffff] transition duration-500 ease-in-out"
                          key={borderCountry.alpha3Code}
                        >
                          {borderCountry.name}
                        </Link>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
