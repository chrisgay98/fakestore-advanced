/// <reference types="@testing-library/jest-dom" />
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderUI } from "./test-utils";

jest.mock("@/api/fakestore", () => ({
  api: {
    products: async () => [
      { id: 1, title: "Test Phone", price: 199, category: "electronics", description: "", image: null }
    ],
    categories: async () => ["electronics"],
  }
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Home from "@/pages/Home"; // change if your list lives elsewhere

test("adds item to cart and updates cart slice", async () => {
  renderUI(<Home goCart={() => {}} />);

  // Find the product and click its add button
  const addBtn = await screen.findByRole("button", { name: /add test phone to cart/i });
  await userEvent.click(addBtn);

  // Inspect the Redux store saved in sessionStorage by the app store
  const raw = sessionStorage.getItem("cart_v1");
  expect(raw).not.toBeNull();
  const cart = JSON.parse(raw ?? "{}");
  expect(cart.items?.length).toBeGreaterThan(0);
  expect(cart.items[0].product.title).toMatch(/test phone/i);
});

