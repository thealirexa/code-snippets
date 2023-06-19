import { useState, useCallback } from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  Textarea,
} from "@chakra-ui/react";

const trigger = [
  "home",
  "house",
  "and", "with", ",", "want",
  "style",
  "color",
  "roof",
  "material",
  "entryway",
  "windows",
  "shutters",
  "garage",
  "driveway",
  "porch",
  "landscaping",
  "lighting",
  "numbers",
  "gutters",
  "fascia",
  "trim",
  "siding",
  "foundation",
  "stairs",
  "railings",
  "awnings",
  "patio",
  "decks",
  "balconies",
  "pool"
];

const basetrigger = [
  "style",
  "color",
  "roof",
  "material",
  "entryway",
  "windows",
  "shutters",
  "garage",
  "driveway",
  "porch",
  "landscaping",
  "lighting",
  "numbers",
  "gutters",
  "fascia",
  "trim",
  "siding",
  "foundation",
  "stairs",
  "railings",
  "awnings",
  "patio",
  "decks",
  "balconies",
  "pool"
];

const options = {
  "want": ["a home", "a house"],
  "home": ["with"],
  "house": ["with"],
  "and": basetrigger, "with": basetrigger, ",": basetrigger,
  style: ["flat", "modern", "traditional", "rustic", "colonial", "victorian"],
  color: ["neutral", "bold", "pastel", "earthy", "monochrome"],
  roof: ["pitched", "flat", "gabled", "hipped", "mansard"],
  material: ["brick", "stucco", "siding", "stone", "concrete"],
  entryway: ["doors", "glass", "wood", "metal", "decorative"],
  windows: ["bay", "casement", "single-hung", "double-hung", "skylights"],
  shutters: ["functional", "non-functional", "installed", "movable", "louvered"],
  garage: ["attached", "detached", "front", "side", "carriage"],
  driveway: ["gravel", "paved", "circular", "concrete", "asphalt"],
  porch: ["covered", "wraparound", "screened", "open-air", "veranda"],
  landscaping: ["lawn", "garden", "pathway", "water", "trees"],
  lighting: ["sconces", "pendants", "flush-mount", "post", "string"],
  numbers: ["visible", "backlit", "matching", "modern", "classic"],
  gutters: ["standard", "seamless", "decorative", "hidden", "screened"],
  fascia: ["wood", "vinyl", "painted", "stained", "metal"],
  trim: ["cornices", "dentils", "gable", "soffits", "brackets"],
  siding: ["clapboard", "shingles", "board-and-batten", "cedar shakes", "stone veneer"],
  foundation: ["brick", "block", "poured", "stone", "stucco"],
  stairs: ["straight", "curved", "wraparound", "slab", "multi-level"],
  railings: ["wooden", "metal", "glass", "wrought iron", "decorative"],
  awnings: ["retractable", "stationary", "striped", "solid", "metal"],
  patio: ["paved", "concrete", "brick", "stone", "gravel"],
  decks: ["elevated", "ground-level", "wraparound", "built-in", "multi-level"],
  balconies: ["upper-level", "lower-level", "front", "rear", "cantilevered"],
  pool: ["in-ground", "above-ground", "lap", "free-form", "saltwater"]
};

export default function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function updateSuggestions(inputValue) {
    if (!inputValue.length) {
      return;
    }
    const inputWords = inputValue.split(" ");
    const lastWord = inputWords[inputWords.length - 1];
    trigger.forEach((trig) => {
      if (lastWord.startsWith(trig)) {
        setSuggestions([...options[trig]]);
      }
    });
  }

  const handleInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    updateSuggestions(inputValue);
    setValue(inputValue);
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setValue(value + ' ' + suggestion);
    setSuggestions(['and']);
    updateSuggestions(value + ' ' + suggestion);
    setValue(value + ' ' + suggestion);
  }, [value]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === " " && event.ctrlKey) {
      setSuggestions(basetrigger);
    }
  }, []);

  return (
    <Box m={'40'} border={8}>
      <Textarea
        autoCapitalize
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && (
        <List mt="2">
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              cursor="pointer"
              _hover={{ background: "gray.100" }}
            >
              <Text>{suggestion}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
