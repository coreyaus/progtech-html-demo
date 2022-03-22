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
        html: `<div class="jumbotron"></div>`,
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
    fields: [
      {
        component: "text",
        name: "name",
        label: "Block name",
        description: "Only visible in the sidebar to help organise your panels",
      },
      {
        component: "code-editor",
        name: "html",
        label: "Your HTML",
        initialValue: `<div class="jumbotron"></div>`,
      },
      {
        component: "code-editor",
        name: "css",
        label: "Your CSS",
        initialValue: "body { background: blue; }",
        // initialValue: (item) => {
        //   const blockId = item.name
        //     .replaceAll(/[^A-Z0-9]/gi, "-")
        //     .toLowerCase();
        //   console.log(item);
        //   return `#${blockId} { background: blue; }`;
        // },
      },
    ],
  },
];

const singleHtmlField = [
  {
    component: "code-editor",
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

const nameAndNumber = (name, count) => {
  return `${name} ${count > 1 ? `#${count}` : ""}`;
};

const buildCodeBlock = (label, defaultHtml, defaultCss) => {
  var blockIncrementor = 0;
  return {
    label: label,
    fields: [
      {
        component: null, // This essentially makes it a hidden field
        name: "name",
        label: "Block name",
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
        // initialValue: "body { background: blue; }",
      },
    ],
    defaultItem: () => {
      blockIncrementor++;
      return {
        name: nameAndNumber(label, blockIncrementor),
        html: defaultHtml ?? "<div class='jumbotron border rounded-0'></div>",
        css: defaultCss ?? "",
      };
    },
    itemProps: (item) => {
      return {
        key: item.id,
        label: item.name,
      };
    },
  };
};

export const buildFormOptionswithBlocks = (label, initialValues) => {
  return {
    label,
    loadInitialValues: () => Promise.resolve(initialValues),
    onSubmit: (payload, formApi, callback) => {
      formApi.reset(payload);
      alert(
        "This form doesn't actually save data anywhere. Your changes will all be gone when you refresh the page"
      );
    },
    // Use block fields with different templates and helper text,
    // rather than just a simple group-list field
    // https://tina.io/docs/reference/toolkit/fields/blocks/
    fields: [
      {
        component: "blocks",
        name: "blocks",
        label: "HTML blocks",
        templates: {
          card: buildCodeBlock("Card"),
          hero: buildCodeBlock("Hero Panel"),
          customCodeBlock: buildCodeBlock("Custom Code Block"),
        },
      },
    ],
  };
};
