import { render, RenderResult } from "@testing-library/react";

import AppListItem from "..";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(<AppListItem title="test title" onClick={() => {}} />);
});

describe("AppListItem component", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render title.", () => {
    expect(wrapper.getByText("test title")).toBeInTheDocument();
  });
});
