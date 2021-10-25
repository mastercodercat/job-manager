import {
  render,
  RenderResult,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";

import JobForm from "..";

let wrapper: RenderResult;
let handleAdd = jest.fn();

beforeEach(() => {
  wrapper = render(<JobForm onAdd={handleAdd} />);
});

describe("JobForm component render", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render only 1 form.", () => {
    expect(wrapper.container.querySelector("form")).toBeInTheDocument();
  });

  it("should render 2 inputs.", () => {
    expect(wrapper.container.querySelectorAll("input")).toHaveLength(2);
  });

  it("should render 1 textarea.", () => {
    expect(
      wrapper.container.querySelectorAll("textarea[name=description]")
    ).toHaveLength(1);
  });

  it("should render submit button.", () => {
    expect(
      wrapper.container.querySelectorAll("button[type=submit]")
    ).toHaveLength(1);
  });

  it("should render add skill button.", () => {
    expect(wrapper.container.querySelector("#add_skill")).toBeInTheDocument();
  });
});

describe("JobForm component interaction", () => {
  it("should return validation error with blank fields while submitting.", async () => {
    fireEvent.click(
      wrapper.container.querySelector("button[type=submit]") as Element
    );

    await waitFor(() => screen.getByText("title is a required field"));

    expect(screen.getByText("title is a required field")).toBeInTheDocument();
    expect(
      screen.getByText("description is a required field")
    ).toBeInTheDocument();
  });

  it("should add skill after clicking skill button.", async () => {
    fireEvent.input(
      wrapper.container.querySelector("input[name=skill]") as Element,
      { target: { value: "skill" } }
    );
    fireEvent.click(wrapper.container.querySelector("#add_skill") as Element);

    await waitFor(() => screen.getByRole("job-skill"));

    expect(screen.getAllByRole("job-skill")).toHaveLength(1);
  });

  it("should submit with valid fields.", async () => {
    fireEvent.input(
      wrapper.container.querySelector("input[name=title]") as Element,
      { target: { value: "title" } }
    );
    fireEvent.input(
      wrapper.container.querySelector("textarea[name=description]") as Element,
      { target: { value: "description" } }
    );
    fireEvent.click(
      wrapper.container.querySelector("button[type=submit]") as Element
    );

    await waitFor(() => {}, { timeout: 1000 });

    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
