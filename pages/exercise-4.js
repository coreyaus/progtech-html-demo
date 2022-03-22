import { Layout } from "../components/Layout";
import { PrimaryInstructions } from "../components/PrimaryInstructions";
import { BlockInstructions } from "../components/BlockInstructions";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/playground.json";

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Exercise 4", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      <PrimaryInstructions blocks={data.blocks} />

      {data?.blocks?.map((block, index) => {
        // Example for getting the HTML code with nice indenting
        // to paste into the .json files for default content
        // console.log(JSON.stringify(block.html));
        const blockId = block.name.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
        return (
          <div key={index}>
            <BlockInstructions block={block} blockId={blockId} />
            <div
              id={blockId}
              dangerouslySetInnerHTML={{ __html: block.html }}
              class={`${
                block.name.toLowerCase() == "dropdown" ? "container" : ""
              }`}
            />
            <style
              type="text/css"
              dangerouslySetInnerHTML={{ __html: block.css }}
            />
          </div>
        );
      })}
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      initialValues,
      currentPath: "/exercise-4",
    },
  };
};
