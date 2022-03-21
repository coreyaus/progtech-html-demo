// import { staticRequest } from "tinacms";
// import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
// import { useTina } from "tinacms/dist/edit-state";
import { useForm, usePlugin } from "tinacms";
// import { allPageFields } from "../.tina/schema.ts";

const variables = {};
// We previuosly included "body" in this GraphQL query
const query = `{
  getPageDocument(relativePath: "home.mdx"){
    data {
      blocks {
        name
        html
      }
    }
  }
}`;

// The incrementor is used in the code below when adding new blocks
var incrementor = 0;

export default function Home(props) {
  const initialData = props.data.data.getPageDocument.data;
  const formOptions = {
    label: "Home Page",
    loadInitialValues: () => Promise.resolve(initialData),
    onSubmit: (payload, formApi, callback) => {
      formApi.reset(payload);
      alert(
        "This form doesn't actually save data anywhere. Your changes will all be gone when you refresh the page"
      );
    },
    fields: [
      {
        component: "group-list",
        name: "blocks",
        label: "HTML blocks",
        defaultItem: () => {
          incrementor++;
          return {
            name: `New panel #${incrementor}`,
            html: `<p>Lorem ipsum dolor sit amet</p>`,
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
            label: "Your HTML code",
          },
        ],
      },
    ],
  };
  const [data, form] = useForm(formOptions);
  usePlugin(form);
  const { blocks } = data;

  return (
    <Layout>
      {/* <TinaMarkdown content={body} /> */}
      {blocks?.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const branch = "main";
  const apiURL = `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

  let data = {};
  try {
    const res = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        // This is the read-only token
        "X-API-KEY": "24a26eafb2dfe62230d3558ade4313b0618d81ca",
        "Content-Type": "application/json",
      },
    });
    data = await res.json();
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
    },
  };
};
