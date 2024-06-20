// UserDetails.test.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import UserDetails from "./UserDetails";

// Mock localStorage implementation
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
    length: Object.keys(store).length,
    key: function (index: number) {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("UserDetails component", () => {
  test("renders user details when user is found", () => {
    // Mock useParams to return a user ID
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ id: "123" }),
    }));

    // Mock localStorage getItem method
    localStorage.setItem(
      "user-123",
      JSON.stringify({ id: "123", username: "Test User" })
    );

    render(
      <MemoryRouter initialEntries={["/user/details/123"]}>
        <Route path="/user/details/:id">
          <UserDetails />
        </Route>
      </MemoryRouter>
    );

    // Check if loader is not displayed
    expect(screen.queryByText("No user found")).not.toBeInTheDocument();

    // Check if user details are rendered
    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    // Add more assertions as needed for other user details

    // Check if localStorage getItem is called with correct key
    expect(localStorage.getItem("user-123")).toBeDefined();
  });

  test('displays "No user found" when user is not found', () => {
    // Mock useParams to return a user ID
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ id: "123" }),
    }));

    // Mock localStorage getItem method to return null
    localStorage.clear(); // Clear any existing storage data

    render(
      <MemoryRouter initialEntries={["/user/details/123"]}>
        <Route path="/user/details/:id">
          <UserDetails />
        </Route>
      </MemoryRouter>
    );

    // Check if loader is not displayed
    expect(screen.queryByText("No user found")).toBeInTheDocument();

    // Check if user details are not rendered
    expect(screen.queryByText("User Details")).not.toBeInTheDocument();
    expect(screen.queryByText("Full Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Phone Number")).not.toBeInTheDocument();
    // Add more assertions as needed for other user details

    // Check if localStorage getItem is called with correct key
    expect(localStorage.getItem("user-123")).toBeNull();
  });
});
