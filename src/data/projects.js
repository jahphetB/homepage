import shoppingCartScreenshot from "../../assets/images/shop-products-sample.png";
import restaurantPageScreenshot from "../../assets/images/restaurant-home-page-screenshot.png";
import battleShipScreenshot from "../../assets/images/battleship-game-screenshot.png";
import weatherAppScreenshot from "../../assets/images/weather-app-screenshot.png";
import memoryCardGameScreenshot from "../../assets/images/memory-card-screenshot.png";
import wayfinderScreenshot from "../../assets/images/way-finder-screenshot.png";


const placeholderDescription = "Short description of the project. Just a couple sentences will do.";

export const projectFilters = [
  { id: "personal", label: "Personal" },
  { id: "games", label: "Games" },
  { id: "ongoing", label: "On going" },
  { id: "services", label: "Services" },
];

export const projects = [
  // Copy the first object, import your screenshot above, then edit its values.
  // Use a unique id; categories match projectFilters; techStack becomes wrapping badges.
  // Array order controls display order. The landing page previews the first six entries.
  {
    id: "wayfinder",
    title: "Wayfinder",
    description: "An interactive digital map for navigating CofI's campus",
    categories: ["personal"],
    techStack: ["TypeScript", "React", "MapLibre GL JS", "Three.js", "Vite", "Vitest", "OpenStreetMap", "Vercel"],
    screenshot: {
      src: wayfinderScreenshot,
      alt: "An interactive digital map for navigating CofI's campus",
    },
    repositoryUrl: "https://github.com/jahphetB/wayfinder",
    liveUrl: "https://wayfinder-umber.vercel.app/",
  },

  {
    id: "shopping-cart",
    title: "Shopping Cart",
    description: "A responsive mock shopping cart application built with React.",
    categories: ["personal"],
    techStack: ["React", "JavaScript", "CSS", "FakeStore API", "Vitest", "React Testing Library"],
    screenshot: {
      src: shoppingCartScreenshot,
      alt: "Shopping Cart product listing with clothing and accessories",
    },
    repositoryUrl: "https://github.com/jahphetB/shopping-cart",
    liveUrl: "https://shopping-cart-phi-six-71.vercel.app/",
  },

  {
    id: "restaurant-page",
    title: "Restaurant Page",
    description: "A responsive mock restaurant page built for real business use",
    categories: ["personal"],
    techStack: ["HTML5", "JavaScript", "CSS"],
    screenshot: {
      src: restaurantPageScreenshot,
      alt: "Restaurant page displaying manu, address, and contanct",
    },
    repositoryUrl: "https://github.com/jahphetB/restaurant_page",
    liveUrl: "https://jahphetb.github.io/restaurant_page/",
  },

  {
    id: "weather-app",
    title: "Weather App",
    description: "Check today's weather in your city and the weather forcast for the next 10 days.",
    categories: ["personal"],
    techStack: ["Visual Crossing API" ,"HTML5", "JavaScript", "CSS", "Webpack", "GitHub Pages"],
    screenshot: {
      src: weatherAppScreenshot,
      alt: "A weather app to check today's weather and weather forcast for the next few days.",
    },
    repositoryUrl: "https://github.com/jahphetB/weather-app",
    liveUrl: "https://jahphetb.github.io/weather-app/",
  },

  {
    id: "battleship-game",
    title: "Battleship Game",
    description: "Fight a moderately smart AI in the game of Battleship.",
    categories: ["games"],
    techStack: ["HTML5", "JavaScript", "CSS", "Jest", "Webpack"],
    screenshot: {
      src: battleShipScreenshot,
      alt: "Play Battleship with AI.",
    },
    repositoryUrl: "https://github.com/jahphetB/battleship-game",
    liveUrl: "https://jahphetb.github.io/battleship-game/",
  },

  {
    id: "memory-card-game",
    title: "Memory Card",
    description: "Test your memory with a simple rule 12 GIF cards game.",
    categories: ["games"],
    techStack: ["GIPHY API", "React", "JavaScript", "CSS", "Vite", "Vercel"],
    screenshot: {
      src: memoryCardGameScreenshot,
      alt: "A simple 12 GIF cards game.",
    },
    repositoryUrl: "https://github.com/jahphetB/memory-card",
    liveUrl: "https://memory-card-eta-nine.vercel.app/",
  },

  {
    id: "three",
    title: "Project name",
    description: placeholderDescription,
    categories: ["ongoing"],
  },
  {
    id: "four",
    title: "Project name",
    description: placeholderDescription,
    categories: ["services"],
  },
  {
    id: "five",
    title: "Project name",
    description: placeholderDescription,
    categories: ["personal"],
  },
  {
    id: "six",
    title: "Project name",
    description: placeholderDescription,
    categories: ["ongoing"],
  },
];
