const { Text, Select, CalendarDay, Relationship } = require("@keystonejs/fields");
const { Content } = require("@keystonejs/field-content");
const { atTracking } = require("@keystonejs/list-plugins");
const enums = require("../../enums");

const conversationSchema = {
  labelResolver: (item) => `${item.nature} - ${item.date.toString("YYYYMMDD HH:mm")}`,
  fields: {
    subject: {
      type: Text,
      isRequired: true,
    },
    nature: {
      type: Select,
      options: enums.Nature_options,
      dataType: "string",
      isRequired: true,
    },
    date: {
      type: CalendarDay,
      format: "DD/MM/YYYY",
      yearRangeFrom: 2020,
    },
    commentaire: {
      type: Content,
    },
    usager: {
      type: Relationship,
      ref: "Usager.conversations",
      many: false,
      isRequired: true,
    },
    conseiller: {
      type: Relationship,
      ref: "User",
      isRequired: true,
    },
  },
  plugins: [
    atTracking(),
    //byTracking(),
  ],
};

const createList = (keystone) => {
  var conversationList = keystone.createList("Conversation", conversationSchema);
  return conversationList;
};
module.exports = createList;