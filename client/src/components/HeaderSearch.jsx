import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/search?query=${searchTerm}`
      );

      if (response.data.success) {
        setSearchResults(response.data.results);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleClickResult = () => {
    // Clear search term and results when a result is clicked
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Clear search results when the component unmounts
  useEffect(() => {
    return () => {
      setSearchResults([]);
    };
  }, []);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search users by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="search-result" style={{ zIndex: 1 }}>
        <ul className="search-list" style={{ zIndex: 1 }}>
          {searchResults.map((user) => (
            <li key={user._id} className="search-list-items">
              <Link
                to={`/userprofileview/${user._id}`}
                onClick={handleClickResult}
              >
                {user.firstName} {user.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
