import { defineSchema, defineConfig } from "tinacms";

// class NumberIncrementor {
//   static latest() {
//     this.latestCount = this.latestCount ?? 0;
//     return this.latestCount;
//   }
// }

const defaultHtmlValues = [
  "Test headline 1",
  "Test headline 2",
  "Test headline 3",
  "Test headline 4",
  "Test headline 5",
  "Test headline 6",
  "Test headline 7",
  "Test headline 8",
  "Test headline 9",
  "Test headline 10",
  "Test headline 11",
  "Test headline 12",
];

var incrementor = 0;
const blockCount = (number): number | string => {
  // number = number + 1;
  // incrementor = number;
  // return number;

  // return defaultHtmlValues.shift() ?? "Test headline";

  return "";
};
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
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "HTML blocks",
          ui: {
            defaultItem: {
              html: `<h2>Test headline ${blockCount(incrementor)}</h2>`,
            },
          },
          fields: [
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
  apiURL,
});
