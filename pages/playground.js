import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/playground.json";

export default function Playground({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Demo page", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      {data?.blocks?.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      initialValues,
      currentPath: "/playground",
    },
  };
};
