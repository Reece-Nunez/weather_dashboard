import React, { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const SearchBar = ({ onSearch }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected index in dropdown
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"], // Restrict to cities
    },
    debounce: 300, // Wait 300ms before calling the API
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleSelect = (description) => {
    setValue(description, false);
    clearSuggestions();
    onSearch(description); // Trigger search for the selected city
  };

  const handleKeyDown = (e) => {
    if (status !== "OK") return;

    if (e.key === "ArrowDown") {
      // Navigate down in dropdown
      setSelectedIndex((prev) => Math.min(prev + 1, data.length - 1));
    } else if (e.key === "ArrowUp") {
      // Navigate up in dropdown
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      // Select the currently highlighted option
      e.preventDefault();
      if (selectedIndex >= 0 && data[selectedIndex]) {
        handleSelect(data[selectedIndex].description);
      } else if (value) {
        onSearch(value); // Trigger search with input value if no dropdown is selected
      }
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={suggestion.place_id}
          onClick={() => handleSelect(suggestion.description)}
          className={selectedIndex === index ? "active" : ""}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  const handleButtonClick = () => {
    if (selectedIndex >= 0 && data[selectedIndex]) {
      handleSelect(data[selectedIndex].description);
    } else if (value) {
      onSearch(value); // Trigger search with input value
    }
  };

  return (
    <div ref={ref} className="autocomplete-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!ready}
          className="form-control"
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      {status === "OK" && (
        <ul className="autocomplete-dropdown">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default SearchBar;
