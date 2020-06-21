const Etape_options = [
  //0 = pas affecté
  { value: 1, label: "Nouveau" },
  { value: 2, label: "Complet" },
  { value: 3, label: "Repondu" },
  { value: 4, label: "Cloturé" },
  { value: -1, label: "Abandonné" },
];

const Nature_options = [
  { value: "CALL", label: "Appel" },
  { value: "MAIL", label: "E-Mail" },
  { value: "LTTR", label: "Courrier" },
  { value: "ESPB", label: "Esp. Benef." },
];

const ContratType_options = [
  { value: "ASD", label: "Aide Sociale" },
  { value: "AID", label: "Aidants" },
];

const Difficulte_options = [
  { value: "1", label: "Simple" },
  { value: "2", label: "Simple + Recherche" },
  { value: "3", label: "Complexe" },
];

const statusColors = {
  1: "success",
  2: "warning",
  3: "danger",
};

const getLabel = (anArray, aValue) => {
  var item = anArray.filter((item) => item.value === aValue)[0];
  return item === undefined ? "" : item.label;
};
module.exports = {
  Etape_options,
  Nature_options,
  ContratType_options,
  Difficulte_options,
  statusColors,
  getLabel,
};
