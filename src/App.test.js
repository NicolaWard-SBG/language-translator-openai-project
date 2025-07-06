import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders language translator heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Language Translator/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders translate button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Translate/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders language options", () => {
  render(<App />);
  const spanishOption = screen.getByText(/Spanish/i);
  const frenchOption = screen.getByText(/French/i);
  const italianOption = screen.getByText(/Italian/i);

  expect(spanishOption).toBeInTheDocument();
  expect(frenchOption).toBeInTheDocument();
  expect(italianOption).toBeInTheDocument();
});
