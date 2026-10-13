import shoppingCartScreenshot from "../../assets/images/shop-products-sample.png";

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
    id: "shopping-cart",
    title: "Shopping Cart",
    description: "A responsive mock shopping cart application built with React.",
    categories: ["personal"],
    techStack: ["React", "JavaScript", "CSS"],
    screenshot: {
      src: shoppingCartScreenshot,
      alt: "Shopping Cart product listing with clothing and accessories",
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
