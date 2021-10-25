import {
  render,
  RenderResult,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import JobBoard from "..";
import { jobs } from "./jobs.mock.json";

let wrapper: RenderResult;
const handleClick = jest.fn();

beforeEach(() => {
  wrapper = render(<JobBoard jobs={jobs} onClick={handleClick} />);
});

describe("JobBoard component", () => {
  it("should render component correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render jobs.", () => {
    expect(screen.getAllByRole("list-item")).toHaveLength(jobs.length);
  });
});
