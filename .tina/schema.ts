import { defineSchema, defineConfig } from "tinacms";

// Tina schema

// =================
// This is where you can define the shape of your content
export default defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        // {
        //   name: "body",
        //   label: "Main Content",
        //   type: "rich-text",
        //   isBody: true,
        // },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "HTML blocks",
          // ui: {
          //   defaultItem: {
          //     name: "New panel",
          //     html: `<p>Lorem ipsum dolor sit amet</p>`,
          //   },
          // },
          fields: [
            {
              type: "string",
              name: "name",
              label: "Block name",
              description:
                "This is just for helping to organise your blocks in the sidebar - it's not visible on the page",
              ui: {
                defaultValue: "test",
              },
            },
            {
              type: "string",
              label: "Your HTML code",
              name: "html",
              ui: {
                component: "textarea",
              },
            },
          ],
        },
      ],
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});

// ===============

// Tina config

const branch = "main";
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  cmsCallback: (cms) => {
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["page"].includes(collection.name)) {
          if (document.sys.filename === "home") {
            return "/";
          }
        }

        if (["post"].includes(collection.name)) {
          return `/posts/${document.sys.filename}`;
        }

        return undefined;
      });

      cms.plugins.add(RouteMapping);
    });
    // import('react-tinacms-editor').then((field)=> {
    //   cms.plugins.add(field.HtmlFieldPlugin)
    // })
    return cms;
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    // The incrementor is used in the code below when adding new blocks
    var incrementor = 0;

    // Find the blocks field
    const blocksField = formConfig.fields.find(
      (field) => field.name === "blocks"
    );

    // Generate default items dynamically for each block
    blocksField.defaultItem = () => {
      incrementor++;
      return {
        name: `New panel #${incrementor}`,
        html: `<p>Lorem ipsum dolor sit amet</p>`,
        // id: Math.random().toString(36).substr(2, 9),
      };
    };

    // Ensure the item's label in the sidebar matches its name
    blocksField.itemProps = (item) => {
      return {
        key: item.id,
        label: item.name,
      };
    };

    // Hijack the onSubmit function for the form...
    // formConfig.onSubmit = (payload, formApi, callback) => {
    //   formApi.reset(payload);
    //   alert("This form doesn't actually save data anywhere. Your changes will all be gone when you refresh the page");
    // };

    return createForm(formConfig);
  },
  // apiURL,
});
