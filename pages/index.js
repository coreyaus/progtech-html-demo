import { staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";

const query = `{
  getPageDocument(relativePath: "home.mdx"){
    data{
      body
      blocks {
        html
      }
    }
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  const { body, blocks } = data.getPageDocument.data;

  return (
    <Layout>
      <TinaMarkdown content={body} />
      {blocks.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
