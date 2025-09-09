import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderUI } from "./test-utils";
import CategorySelect from "../src/components/CategorySelect";

import { jest } from "@jest/globals";
jest.mock("@/api/fakestore", () => ({
  api: { categories: async () => ["electronics", "jewelery"] },
}));

test("loads categories and allows selection", async () => {
  const onChange = jest.fn();
  renderUI(<CategorySelect value="" onChange={onChange} />);

  await waitFor(() => expect(screen.getByRole("option", { name: /electronics/i })).toBeInTheDocument());
  const select = screen.getByRole("combobox");
  await userEvent.selectOptions(select, "electronics");
  expect(onChange).toHaveBeenCalledWith("electronics");
});
