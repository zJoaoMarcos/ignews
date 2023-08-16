import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

describe("Async Test Example", () => {
  it("renders correctly", async () => {
    render(<Async />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();

    // for test with async components
    // expect(await screen.findByText("Button")).toBeInTheDocument();

    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    });

    await waitFor(() => {
      return expect(
        screen.queryByText("Button Invisible")
      ).not.toBeInTheDocument();
    });
  });
});
