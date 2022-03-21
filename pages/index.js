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

const variables = {};

export default function Home(props) {
  const branch = "main";
  const apiURL =
    process.env.NODE_ENV == "development"
      ? "http://localhost:4001/graphql"
      : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

  const [initalData, setData] = useState(props.data);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        // This is the read-only token
        "X-API-KEY": "24a26eafb2dfe62230d3558ade4313b0618d81ca",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query, JSON.stringify(variables)]);

  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables,
    data: initalData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Something went wrong. Please try again later</p>;

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
