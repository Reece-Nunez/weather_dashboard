import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const SearchBar = ({ onSearch }) => {
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

  const handleSelect = ({ description }) => {
    setValue(description, false);
    clearSuggestions();
    onSearch(description); // Trigger search for the selected city
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="autocomplete-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="form-control"
      />
      {status === "OK" && <ul className="autocomplete-dropdown">{renderSuggestions()}</ul>}
    </div>
  );
};

export default SearchBar;
