import defaultContent from "../content/pages/exercise-4.json";

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

const buildBlock = (blockType) => {
  const label = mapNamesToLabels[blockType];
  const buildBlockName = (count) => {
    if (count === 1) return label;
    return `${label} #${count}`;
  };
  const blockClasses = (blockId) => {
    if (blockType === blockId) return blockType;
    return `${blockType} ${blockId}`;
  };
  const defaultHtml = defaultContent[blockType]?.html;
  const defaultCss = defaultContent[blockType]?.css;

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
        // initialValue: "body { background: blue; }",
      },
    ],
    defaultItem: () => {
      blockIncrementor++;
      const blockName = buildBlockName(blockIncrementor);
      const blockId = blockName.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
      return {
        name: buildBlockName(blockIncrementor),
        html: defaultHtml ?? `<div class='p-5 ${blockClasses(blockId)}'></div>`,
        css: defaultCss ?? `.${blockId} { background: #e9ecef; }`,
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

export const mapNamesToLabels = {
  card: "Card",
  hero: "Hero Panel",
  // customCode: "Custom Code Block",
  customCode: "Dropdown button (hardest)",
};

// Use block fields with different templates and helper text,
// rather than just a simple group-list field
// https://tina.io/docs/reference/toolkit/fields/blocks/
export const blockFields = [
  {
    component: "toggle",
    name: "hideInstructions",
    label: "Would you like to hide all the instructions from this page?",
  },
  {
    component: "blocks",
    name: "blocks",
    label: "HTML blocks",
    templates: {
      card: buildBlock("card"),
      hero: buildBlock("hero"),
      customCode: buildBlock("customCode"),
    },
  },
];
