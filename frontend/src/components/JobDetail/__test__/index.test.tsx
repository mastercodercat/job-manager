import { render, RenderResult, screen } from "@testing-library/react";

import JobDetail from "..";
import { jobs } from "../../JobBoard/__test__/jobs.mock.json";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(<JobDetail job={jobs[0]} />);
});

describe("JobDetail component", () => {
  it("should render component correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render job detail.", () => {
    expect(screen.getByText(jobs[0].title)).toBeInTheDocument();
    expect(screen.getByText(jobs[0].description)).toBeInTheDocument();
    expect(
      screen.getByText(jobs[0].skills.map((skill) => skill.name).join(", "))
    ).toBeInTheDocument();
  });
});
