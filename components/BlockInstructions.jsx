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
    <div className="accordion" id={accordionId}>
      <div className="card text-white bg-info rounded-0">
        <div className="card-header" id={`headingOne-${accordionId}`}>
          <h4 className="mb-0">
            <button
              className="btn btn-link text-light text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target={`#collapseOne-${accordionId}`}
              aria-expanded="false"
              aria-controls={`collapseOne-${accordionId}`}
            >
              {block.name} - click to show the tasks and suggestions for this
              block
            </button>
          </h4>
        </div>
        <div
          id={`collapseOne-${accordionId}`}
          className="bg-white text-dark collapse"
          aria-labelledby={`headingOne-${accordionId}`}
          data-parent={`#${accordionId}`}
        >
          <div className="card-body">
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
  } else if (block.name.includes("Dropdown")) {
    return <DropdownTasks block={block} />;
  } else {
    return null;
  }
};

const HeroPanelTasks = ({ block }) => {
  return (
    <div className="pt-2 pb-3">
      <ol>
        <li>
          Add an image to the panel using an "&lt;img&gt;" tag (make sure to set
          a "src" attribute!)
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
        <li>
          Customise all the content and styles for this panel until your heart's
          content!
        </li>
      </ol>
    </div>
  );
};

const CardTasks = ({ block }) => {
  return (
    <div className="pt-2">
      <ol>
        <li className="pb-2">
          <p>
            Change the content of the <strong>"src" attribute</strong> in the
            "&lt;img/&gt;" tag to be the url of any image.
          </p>
          <p>Or you can copy in the following random URL:</p>
          <div className="input-group mb-2 w-50">
            <input
              className="form-control"
              type="text"
              value="https://source.unsplash.com/random/400x300"
              id="myInput"
            ></input>
            <div className="input-group-append">
              <div className="tooltip">
                <button
                  className="btn btn-info"
                  onClick={copyToClipboard}
                  onMouseOut={outFunc}
                >
                  <span className="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  Copy image URL
                </button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p>
            Change the text of the card to describe the image you have added
          </p>
        </li>
        <li>
          <p>
            Change the <strong>href attribute</strong> in the "&lt;a&gt;" tag to
            a url of your choosing (then click the button to see it work!)
          </p>
        </li>
        <li>
          <p>
            Try adding a second card to the panel by copy/pasting the code from
            the first one
          </p>
        </li>
        <li>
          <p>
            Update the content and styles of these cards to promote a couple of
            your organisation's main campaigns
          </p>
        </li>
      </ol>
    </div>
  );
};

const DropdownTasks = ({ block }) => {
  return (
    <div className="pt-2">
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
