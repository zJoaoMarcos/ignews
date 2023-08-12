import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Active Link Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active" legacyBehavior>
        <p>Home</p>
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds ative class if the link as currently", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <p>Home</p>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
