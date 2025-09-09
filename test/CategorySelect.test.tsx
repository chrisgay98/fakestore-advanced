/// <reference types="@testing-library/jest-dom" />
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderUI } from "./test-utils";
// jest-dom matchers are loaded via test/setupTests.ts (configured in jest.config.cjs)

// Mock your categories API:
import { jest } from "@jest/globals";
jest.mock("@/api/fakestore", () => ({
  api: {
    categories: async () => [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ],
  },
}));

// If your path differs, adjust it:
import CategorySelect from "../src/components/CategorySelect";

test("renders categories and allows selecting one", async () => {
  const onChange = jest.fn();
  renderUI(<CategorySelect value="" onChange={onChange} />);

  // Wait for async options to appear
  await waitFor(() =>
    expect(
      screen.getByRole("option", { name: /electronics/i })
    ).toBeInTheDocument()
  );

  const select = screen.getByRole("combobox");
  await userEvent.selectOptions(select, "electronics");
  expect(onChange).toHaveBeenCalledWith("electronics");
});

