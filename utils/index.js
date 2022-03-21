// The incrementor is used in the code below when adding new blocks
var incrementor = 0;

const blockFields = [
  {
    component: "group-list",
    name: "blocks",
    label: "HTML blocks",
    defaultItem: () => {
      incrementor++;
      return {
        name: `New panel #${incrementor}`,
        html: "<p>Lorem ipsum dolor sit amet</p>",
        // id: Math.random().toString(36).substr(2, 9),
      };
    },
    itemProps: (item) => {
      return {
        key: item.id,
        label: item.name,
      };
    },
    fields: [
      {
        component: "text",
        name: "name",
        label: "Block name",
        description:
          "This is just for helping to organise your blocks in the sidebar - it's not visible on the page",
      },
      {
        component: "textarea",
        name: "html",
        label: "Your HTML",
        initialValue: "<p>Lorem ipsum dolor sit amet</p>",
      },
    ],
  },
];

const singleHtmlField = [
  {
    component: "textarea",
    name: "html",
    label: "HTML for the page",
  },
];

export const buildFormOptions = (label, initialValues) => {
  return {
    label,
    loadInitialValues: () => Promise.resolve(initialValues),
    onSubmit: (payload, formApi, callback) => {
      formApi.reset(payload);
      alert(
        "This form doesn't actually save data anywhere. Your changes will all be gone when you refresh the page"
      );
    },
    fields: initialValues.hasOwnProperty("blocks")
      ? blockFields
      : singleHtmlField,
  };
};
