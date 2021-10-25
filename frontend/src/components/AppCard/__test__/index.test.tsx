import { render, RenderResult } from "@testing-library/react";

import AppCard from "..";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(
    <AppCard title="Job">
      <div></div>
    </AppCard>
  );
});

describe("AppCard component", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render title.", () => {
    expect(wrapper.getByText("Job")).toBeInTheDocument();
  });
});
