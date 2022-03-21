// import { staticRequest } from "tinacms";
// import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";

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

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables,
    data: props.data,
  });
  // const { body, blocks } = data.getPageDocument.data;
  const { blocks } = data.getPageDocument.data;

  return (
    <Layout>
      {/* <TinaMarkdown content={body} /> */}
      {blocks.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const branch = "main";
  const apiURL =
    process.env.NODE_ENV == "development"
      ? "http://localhost:4001/graphql"
      : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

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
