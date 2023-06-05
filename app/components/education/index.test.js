import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Education from "./index";
import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Education Component", () => {
  const mockUser = { id: "123e4567-e89b-12d3-a456-426655440000" };

  beforeEach(() => {
    const mockEducations = [
      {
        id: "1",
        institution: "Test Institution",
        degree: "Bachelor's Degree",
        field_of_study: "Computer Science",
        start_date: "2020-01-01",
        end_date: "2024-01-01",
        grade: "A+",
        description: "Studying Computer Science",
      },
    ];

    useState.mockImplementation((initialState) => [mockEducations, jest.fn()]);
    render(<Education user={mockUser} />);
  });

  test("renders component title", () => {
    const titleElement = screen.getByText("Education");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders add education button", () => {
    const addButton = screen.getByText("+ Add Education");
    expect(addButton).toBeInTheDocument();
  });

  test("displays loading state while fetching data", () => {
    const loadingSpinner = screen.queryByText("Doing magic...");
    expect(loadingSpinner).not.toBeInTheDocument();
  });
});
