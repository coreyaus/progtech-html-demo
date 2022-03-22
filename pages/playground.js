import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/playground.json";

const displayInstructions = (block) => {
  // Base this condition on the block name
  // (replacing the example placeholder conditional below)
  if (block.hasOwnProperty("html")) {
    return <p>Instructions on where to find the HTML snippet</p>;
  }
};
export default function Playground({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Demo page", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      {data?.blocks?.map((block, index) => {
        // Example for getting the HTML code with nice indenting
        // to paste into the .json files for default content
        // console.log(JSON.stringify(block.html));
        const blockId = block.name.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
        return (
          <>
            {displayInstructions(block)}
            <div
              key={index}
              id={blockId}
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
            <style
              type="text/css"
              key={index}
              id={blockId}
              dangerouslySetInnerHTML={{ __html: block.css }}
            />
          </>
        );
      })}
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
