import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme";

import { render, cleanup } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { toContainMatchingElements } from "jest-enzyme";

import { MemoryRouter } from "react-router-dom";

import DemandeTable from "./DemandeTable.js";

const demandes = [
  {
    slug: "2020-MALO-THIERRY-001",
    contrat: {
      id: "1",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 1,
    lastContact: {
      nature: "MAIL",
      date: "2020-06-14 15:52:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-002",
    contrat: {
      id: "1",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 3,
    lastContact: {
      nature: "LTTR",
      date: "2020-06-14 15:52:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-003",
    contrat: {
      id: "1",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 1,
    lastContact: {
      nature: "CALL",
      date: "2020-06-15 16:32:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-004",
    contrat: {
      id: "1",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 2,
    lastContact: {
      nature: "ESPB",
      date: "2020-06-14 16:52:34",
    },
  },
];

describe("DemandeTable", () => {
  afterEach(cleanup);

  it("should have 5 TableRow", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <DemandeTable demandes={demandes} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(wrapper).toContainMatchingElements(5, "tr");
  });

  it("should take a snapshot", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <MemoryRouter
          initialEntries={[{ key: "v5splg", pathname: "/" }]}
          initialIndex={1}
        >
          <DemandeTable demandes={demandes} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(
      toJson(component, { noKey: true, mode: "shallow", ignoreDefaultProps: true })
    ).toMatchSnapshot();
  });
});
