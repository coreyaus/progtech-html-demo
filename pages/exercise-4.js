import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptionswithBlocks } from "../utils";
import initialValues from "../content/pages/playground.json";

const copyToClipboard = () => {
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied";
};

const outFunc = () => {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
};

const displayInstructions = (block) => {
  // Base this condition on the block name
  // (replacing the example placeholder conditional below)
  if (block.name.toLowerCase().includes("new panel")) {
    return (
      <div className="container pt-4">
        This is a blank panel for you to have some fun!
      </div>
    );
  }
  switch (block.name.toLowerCase()) {
    case "hackable demo panel":
      return (
        <div className="container pt-4">
          <h1>Demo Panel</h1>
          <ol>
            <li>
              Add a link to the text of the panel using an "&lt;a&gt;" tag
            </li>
            <li>
              Add a <strong>href attribute</strong> to the "&lt;a&gt;" tag that
              links to a place of your choosing.
              <div>
                <span id="panel-link-hint">
                  (<u>hover for hint</u>)
                </span>
              </div>
            </li>
            <li>
              Change the background color of the "&lt;div&gt;" with the id of
              "demo_panel" to yellow using <strong>inline styling</strong>
              <div>
                <span id="panel-inline-hint">
                  (<u>hover for hint</u>)
                </span>
              </div>
            </li>
            <li>
              Change the color of the text on the panel to red using{" "}
              <strong>style tags</strong> in your html editor
              <div>
                <span id="panel-tag-hint">
                  (<u>hover for hint</u>)
                </span>
              </div>
            </li>
          </ol>
        </div>
      );
    case "card":
      return (
        <div class="container pt-4">
          <h1>Card</h1>
          <ol>
            <li class="pb-2">
              <p>
                Change the content of the <strong>"src" attribute</strong> in
                the "&lt;img/&gt;" tag to be the url of any image.
              </p>
              <p>Or you can copy in the following random URL:</p>
              <input
                className="mr-2"
                type="text"
                value="https://source.unsplash.com/random/400x300"
                id="myInput"
              ></input>
              <div class="tooltip">
                <button onClick={copyToClipboard} onMouseOut={outFunc}>
                  <span class="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  Copy image URL
                </button>
              </div>
            </li>
            <li class="pb-2">
              <p>
                Change the text of the card to describe the image you have added
              </p>
            </li>
            <li>
              Change the <strong>href attribute</strong> in the "&lt;a&gt;" tag
              to a url of your choosing (then click the button to see it work!)
            </li>
          </ol>
        </div>
      );
    case "dropdown":
      return (
        <div class="container pt-4">
          <h1>Dropdown</h1>
          <ol>
            <li>
              Go to the{" "}
              <a
                target="_blank"
                href="https://getbootstrap.com/docs/4.6/components/dropdowns/"
              >
                bootstrap dropdown component page.
              </a>
            </li>
            <li>
              Scroll down until you find the <strong>first code example</strong>
              . Copy and paste this into your html field.
            </li>
            <li>
              Change the <strong>background color</strong> of the button using
              the css editor
              <div>
                <span id="dropdown-bg-hint">
                  (<u>hover for hint</u>)
                </span>
              </div>
            </li>
            <li>
              Change the <strong>font size</strong> of the button using the css
              editor
              <div>
                <span id="dropdown-font-hint">
                  (<u>hover for hint</u>)
                </span>
              </div>
            </li>
          </ol>
        </div>
      );
    default:
      return "";
  }
};

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptionswithBlocks("Exercise 4", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      {data?.blocks?.map((block, index) => {
        // Example for getting the HTML code with nice indenting
        // to paste into the .json files for default content
        // console.log(JSON.stringify(block.html));
        // console.log(JSON.stringify(block.name));
        const blockId = block.name.replaceAll(/[^A-Z0-9]/gi, "-").toLowerCase();
        return (
          <>
            {displayInstructions(block)}
            <div
              key={index}
              id={blockId}
              dangerouslySetInnerHTML={{ __html: block.html }}
              class={`${
                block.name.toLowerCase() == "dropdown" ? "container" : ""
              }`}
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
      currentPath: "/exercise-4",
    },
  };
};
