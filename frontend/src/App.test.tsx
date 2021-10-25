import { render, screen, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./redux/store";

let wrapper: RenderResult;

beforeEach(() => {
  wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe("App test", () => {
  it("should render correctly.", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
