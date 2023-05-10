import React from "react";
import { useSelector } from "react-redux";

const SearchList = () => {
  const searchHistory = useSelector((state) => state.searchHistory);
  return (
    <div className="search-list">
      <ul>
        {Object.entries(searchHistory).map(([userId, cities]) => (
          <li key={userId}>
            <ul>
              {cities.map((city, index) => (
                <li key={`${userId}-${index}`}>{city}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
