import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { GenCC } from "./utils/generateCardNumber";

describe("Visa card", () => {
  it("should have 16 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId(/card-input/i);
    input.value = GenCC("Visa", 1)[0];
    fireEvent.blur(input);
    expect(input.value).toHaveLength(16);
  });
});

describe("Verve card", () => {
  it("should have 18 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId(/card-input/i);
    input.value = GenCC("Verve", 1)[0];
    fireEvent.blur(input);
    expect(input.value).toHaveLength(18);
  });
});

describe("Mastercard", () => {
  it("should have 16 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId(/card-input/i);
    input.value = GenCC("MasterCard", 1)[0];
    fireEvent.blur(input);
    expect(input.value).toHaveLength(16);
  });
});
