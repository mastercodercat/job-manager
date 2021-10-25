import { render, RenderResult, screen } from "@testing-library/react";

import TopSkills from "..";
import { skills } from "./skills.mock.json";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(<TopSkills skills={skills} />);
});

describe("TopSkills component", () => {
  it("should render component correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 5 skills.", () => {
    expect(screen.getAllByRole("top-skills")).toHaveLength(5);
  });
});
