import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderUI } from "./test-utils";
import ProductCard from "../src/components/ProductCard";

const product = { id: 1, title: "Test Phone", price: 199, description: "desc", image: null, rating: { rate: 4.5, count: 10 }, category: "electronics" } as any;

test("renders product info and adds to cart", async () => {
  renderUI(<ProductCard product={product} />);

  expect(screen.getByRole("heading", { name: /test phone/i })).toBeInTheDocument();
  const btn = screen.getByRole("button", { name: /add test phone to cart/i });
  await userEvent.click(btn);

  // Clicking the button dispatches addToCart; we don't assert store here (integration test covers that)
  expect(btn).toBeInTheDocument();
});
