const { v4: uuidv4 } = require("uuid");

const messages = [
  {
    id: uuidv4(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Quisque nibh libero, pretium id sollicitudin vel, pellentesque eget magna. Ut quam elit, aliquam eu feugiat sed, volutpat vitae ante. Ut rutrum, ipsum eget ornare bibendum, urna magna cursus diam, ut pellentesque lectus enim ac ligula. Curabitur auctor diam iaculis risus blandit rhoncus. Sed non magna ac lectus vestibulum eleifend.",
    user: "Charles",
    added: new Date(),
  },
  {
    id: uuidv4(),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis est ac placerat rutrum. Donec at libero eu nibh finibus volutpat. ",
    user: "Vi",
    added: new Date(),
  },
];

module.exports = messages;
