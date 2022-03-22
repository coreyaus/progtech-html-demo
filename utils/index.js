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

const buildBlock = (label, defaultHtml, defaultCss) => {
  const nameAndNumber = (name, count) => {
    if (count === 1) return name;
    return `${name} #${count}`;
  };

  // This incrementor is used in the code below when adding new blocks
  var blockIncrementor = 0;

  return {
    label: label,
    fields: [
      {
        component: null, // This essentially makes it a hidden field
        name: "name",
        label: "Block name",
        description: "Only visible in the sidebar to help organise your panels",
      },
      {
        component: "code-editor",
        name: "html",
        label: "Your HTML",
      },
      {
        component: "code-editor",
        name: "css",
        label: "Your CSS",
        initialValue: "body { background: blue; }",
      },
    ],
    defaultItem: () => {
      blockIncrementor++;
      const blockName = nameAndNumber(label, blockIncrementor);
      const blockId = blockName.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
      return {
        name: nameAndNumber(label, blockIncrementor),
        html: defaultHtml ?? "<div class='jumbotron border rounded-0'></div>",
        css: defaultCss ?? `#${blockId} { background: red; }`,
        // id: Math.random().toString(36).substr(2, 9),
      };
    },
    itemProps: (item) => {
      return {
        key: item.id,
        label: item.name,
        // id: item.name.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase(),
      };
    },
  };
};

const singleHtmlField = [
  {
    component: "code-editor",
    name: "html",
    label: "HTML for the page",
  },
];

// Use block fields with different templates and helper text,
// rather than just a simple group-list field
// https://tina.io/docs/reference/toolkit/fields/blocks/
const blockFields = [
  {
    component: "blocks",
    name: "blocks",
    label: "HTML blocks",
    templates: {
      card: buildBlock("Card"),
      hero: buildBlock("Hero Panel"),
      customCode: buildBlock("Custom Code Block"),
    },
  },
];
