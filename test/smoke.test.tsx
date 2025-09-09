/// <reference types="@testing-library/jest-dom" />
import { renderUI } from "./test-utils";
import { screen } from "@testing-library/react";

function Hello({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

test("renders hello", () => {
  renderUI(<Hello name="Chris" />);
  expect(screen.getByRole("heading", { name: /hello, chris/i })).toBeInTheDocument();
});

