import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

const PLACEHOLDER = "0000 0000 0000 0000";

describe("Visa card", () => {
  it("should have 16 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByPlaceholderText(PLACEHOLDER);
    input.value = "4509332032932990";
    fireEvent.blur(input);
    expect(input.value).toHaveLength(16);
  });
});

describe("Verve card", () => {
  it("should have 18 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByPlaceholderText(PLACEHOLDER);
    input.value = "506133203293299093";
    fireEvent.blur(input);
    expect(input.value).toHaveLength(18);
  });
});

describe("Mastercard", () => {
  it("should have 16 digits", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByPlaceholderText(PLACEHOLDER);
    input.value = "5423332032932990";
    fireEvent.blur(input);
    expect(input.value).toHaveLength(16);
  });
});

describe("Card number", () => {
  it("should show error element if invalid card number is provided", () => {
    render(<App />);
    const inputEl: HTMLInputElement = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(inputEl, { target: { value: "54233320332990" } });

    const errorEl = screen.getByTestId("cardNumberErrorEl");
    expect(errorEl.textContent).toBe("Card number is invalid");
  });
});
