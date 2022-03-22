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

export const BlockInstructions = ({ block, blockId }) => {
  const accordionId = `${blockId}-accordion`;
  return (
    <div class="accordion" id={accordionId}>
      <div class="card text-white bg-info">
        <div class="card-header" id={`headingOne-${accordionId}`}>
          <h4 class="mb-0">
            <button
              class="btn btn-link text-light text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target={`#collapseOne-${accordionId}`}
              aria-expanded="false"
              aria-controls={`collapseOne-${accordionId}`}
            >
              {block.name} - click to see the task instructions
            </button>
          </h4>
        </div>
        <div
          id={`collapseOne-${accordionId}`}
          class="bg-white text-dark collapse"
          aria-labelledby={`headingOne-${accordionId}`}
          data-parent={`#${accordionId}`}
        >
          <div class="card-body">
            <BlockTasks block={block} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BlockTasks = ({ block }) => {
  if (block.name.includes("Hero")) {
    return <HeroPanelTasks block={block} />;
  } else if (block.name.includes("Card")) {
    return <CardTasks block={block} />;
  } else if (block.name.includes("Custom Code")) {
    return <CustomCodeTasks block={block} />;
  } else {
    return null;
  }
};

const HeroPanelTasks = ({ block }) => {
  return (
    <div className="pt-2">
      <ol>
        <li>Add a link to the text of the panel using an "&lt;a&gt;" tag</li>
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
};

const CardTasks = ({ block }) => {
  return (
    <div class="pt-2">
      <ol>
        <li class="pb-2">
          <p>
            Change the content of the <strong>"src" attribute</strong> in the
            "&lt;img/&gt;" tag to be the url of any image.
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
          Change the <strong>href attribute</strong> in the "&lt;a&gt;" tag to a
          url of your choosing (then click the button to see it work!)
        </li>
      </ol>
    </div>
  );
};

const CustomCodeTasks = ({ block }) => {
  return (
    <div class="pt-2">
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
          Scroll down until you find the <strong>first code example</strong>.
          Copy and paste this into your html field.
        </li>
        <li>
          Change the <strong>background color</strong> of the button using the
          css editor
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
};
