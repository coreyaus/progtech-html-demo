import { Layout } from "../components/Layout";
import { PrimaryInstructions } from "../components/PrimaryInstructions";
import { BlockInstructions } from "../components/BlockInstructions";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Exercise 4", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      {!data.hideInstructions && <PrimaryInstructions blocks={data.blocks} />}

      {data?.blocks?.map((block, index) => {
        // Example for getting the HTML code with nice indenting
        // to paste into the .json files for default content
        // console.log(JSON.stringify(block.html));
        const blockId = block.name.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
        return (
          <div key={index}>
            {!data.hideInstructions && (
              <BlockInstructions block={block} blockId={blockId} />
            )}
            <div
              id={blockId}
              dangerouslySetInnerHTML={{ __html: block.html }}
              className={`${
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
      initialValues: { blocks: null },
      currentPath: "/exercise-4",
    },
  };
};
