import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("CVC Tests", () => {
  it("should show error element if invalid CVC is provided", () => {
    render(<App />);
    const inputEl: HTMLInputElement = screen.getByTestId("cvcEl");
    fireEvent.change(inputEl, { target: { value: "12" } });

    const errorEl = screen.getByTestId("cvcErrorEl");
    expect(errorEl.textContent).toBe("CVC is invalid");
  });
});
