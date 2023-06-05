import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

describe("Home", () => {
  it("renders a Dashboard", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
