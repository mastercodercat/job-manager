import { render, RenderResult } from "@testing-library/react";

import Layout from "..";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(<Layout />);
});

describe("AppContainer component", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render title.", () => {
    expect(wrapper.getByText("Harness Job Manager")).toBeInTheDocument();
  });
});
