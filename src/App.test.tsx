import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const PLACEHOLDER = "0000 0000 0000 0000";

test("renders react-creditcard-input", () => {
  render(<App />);
  const linkElement = screen.getByText(/react-creditcard-input/i);
  expect(linkElement).toBeInTheDocument();
});

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

describe("Date Tests", () => {
  it("should show error element if invalid date is provided", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId("expiryDateEl");
    input.value = "02/22";
    fireEvent.blur(input);

    const errorEl = screen.getByTestId("expiryErrorEl");
    expect(errorEl).toBeInTheDocument();
  });
});

describe("CardNumber Tests", () => {
  it("should show error element if invalid cardNumber is provided", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId("cardNumberEl");
    input.value = "5423332032932990";
    fireEvent.blur(input);

    const errorEl = screen.getByTestId("cardNumberErrorEl");
    expect(errorEl).toBeInTheDocument();
  });
});

describe("CVC Tests", () => {
  it("should show error element if invalid CVC is provided", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByTestId("cvcEl");
    input.value = "1";
    fireEvent.blur(input);

    const errorEl = screen.getByTestId("cvcErrorEl");
    expect(errorEl).toBeInTheDocument();
  });
});
