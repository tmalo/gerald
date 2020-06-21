import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme";

import { render, cleanup } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { toContainMatchingElements } from "jest-enzyme";

import { MemoryRouter } from "react-router-dom";

import ContratTable from "./ContratTable.js";

const contrats = [
  {
    id: "5ede2146a2206313085c3d68",
    societe: "Banque Postale",
    type_contrat: "ASD",
    date_lancement: "2020-08-06",
    nb_usagers: {
      count: 1,
    },
    nb_sites: {
      count: 1,
    },
  },
];

describe("ContratTable", () => {
  afterEach(cleanup);

  it("should have 5 TableRow", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ContratTable contrats={contrats} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(wrapper).toContainMatchingElements(2, "tr");
  });

  it("should take a snapshot", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <MemoryRouter
          initialEntries={[{ key: "v5splg", pathname: "/" }]}
          initialIndex={1}
        >
          <ContratTable contrats={contrats} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      toJson(component, { noKey: true, mode: "shallow", ignoreDefaultProps: true })
    ).toMatchSnapshot();
  });
});
