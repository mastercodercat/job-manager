import { render, RenderResult } from "@testing-library/react";

import AppContainer from "..";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(
    <AppContainer isLoading={false} component={<div className="test"></div>} />
  );
});

describe("AppContainer component", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render child component while loading.", () => {
    expect(wrapper.container.querySelector(".test")).toBeInTheDocument();
  });

  it("should not render child component while loading.", () => {
    const { container } = render(
      <AppContainer isLoading component={<div className="test" />} />
    );

    expect(container.querySelectorAll(".test")).toHaveLength(0);
  });
});
