import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./styles.css";

interface AutocompleteProps {
  data: string[];
  title: string;
  placeholder: string;
  onSelect?: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  data,
  title,
  placeholder,
  onSelect,
}) => {
  const [query, setQuery] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const userInput = e.target.value;
    setQuery(userInput);

    if (userInput) {
      const filtered = data.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setQuery(suggestion);
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex + 1 < filteredSuggestions.length ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (filteredSuggestions.length > 0) {
        const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
        setQuery(selectedSuggestion);
        setShowSuggestions(false);
        if (onSelect) {
          onSelect(selectedSuggestion);
        }
      }
    }
  };

  return (
    <div className="autocomplete">
      <p>{title}</p>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {showSuggestions && query && (
        <ul className="suggestions-list">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className={index === activeSuggestionIndex ? "active" : ""}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li>Nenhuma sugestão encontrada</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
