import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("Expiry Date Tests", () => {
  it("should show error text if invalid date is provided", () => {
    render(<App />);
    const inputEl: HTMLInputElement = screen.getByTestId("expiryDateEl");
    fireEvent.change(inputEl, { target: { value: "02/22" } });

    const errorEl = screen.getByTestId("expiryErrorEl");
    expect(errorEl.textContent).toBe("Expiry date cannot be in the past");
  });
});
