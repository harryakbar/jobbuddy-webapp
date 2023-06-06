import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

// Mock the environment variables
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_SUPABASE_URL: "mocked-supabase-url",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "mocked-supabase-anon-key",
  },
}));

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    // mock implementation of the Supabase client methods
    // you can customize these mock methods based on your test requirements
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    // ...add more mock methods as needed
  })),
}));

describe("Home", () => {
  it("renders a Dashboard", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
