import shoppingCartScreenshot from "../../assets/images/shopping-cart-screenshot.png";

const placeholderDescription = "Short description of the project. Just a couple sentences will do.";

export const projectFilters = [
  { id: "personal", label: "Personal" },
  { id: "games", label: "Games" },
  { id: "ongoing", label: "On going" },
  { id: "services", label: "Services" },
];

export const projects = [
  // Copy this complete project object and edit its values when adding a new project.
  {
    id: "shopping-cart",
    title: "Shopping Cart",
    description: "A responsive mock shopping cart application built with React.",
    categories: ["personal"],
    screenshot: {
      src: shoppingCartScreenshot,
      alt: "Shopping Cart application home page",
    },
    repositoryUrl: "https://github.com/jahphetB/shopping-cart",
    liveUrl: "https://shopping-cart-phi-six-71.vercel.app/",
  },
  {
    id: "one",
    title: "Project name",
    description: placeholderDescription,
    categories: ["personal"],
  },
  {
    id: "two",
    title: "Project name",
    description: placeholderDescription,
    categories: ["games"],
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
