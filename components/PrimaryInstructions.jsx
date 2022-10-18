import { blockFields } from "../utils";

const allTemplateNames = Object.keys(
  blockFields.find((field) => field.name === "blocks")["templates"]
);

const setIntersection = (set1, set2) => {
  return Array.from(set1).filter((el) => set2.has(el));
};

export const PrimaryInstructions = ({ blocks }) => {
  const currentTemplates = blocks?.map((block) => block._template) || [];
  const templatesInUse = setIntersection(
    new Set(allTemplateNames),
    new Set(currentTemplates)
  );
  const allTemplatesInUse = templatesInUse.length === allTemplateNames.length;

  return (
    <div
      className={`alert ${allTemplatesInUse ? "alert-success" : "alert-info"}`}
    >
      <div className="container-lg py-2">
        <h1 className="display-4">
          <strong>Exercise 4</strong>
        </h1>
        <p className="lead">
          Use the sidebar to add new HTML blocks and edit them to your liking!
        </p>
        {allTemplatesInUse ? (
          <p className="lead">
            <strong className="font-weight-bold">
              Great work - you're now using all of the different block types!
              <br />
              Keep customising your page using the code editors in the sidebar!
            </strong>
          </p>
        ) : (
          <>
            <p className="lead">
              <strong className="font-weight-bold">
                These are {allTemplateNames.length} different blocks. Make sure
                to add one of each type to your page!
              </strong>
            </p>
            {templatesInUse.length > 0 && (
              <p className="lead">
                <span>
                  You're currently using {templatesInUse.length} of the{" "}
                  {allTemplateNames.length} different block types available
                </span>
              </p>
            )}
          </>
        )}
        <ul className="lead">
          <li>
            A blue collapsible panel appears above blocks marked with "*" with some tasks
            and suggestions about changes you could make
          </li>
          <li>
            You can reorder the blocks using the drag and drop tool in the
            sidebar
          </li>
        </ul>
      </div>
    </div>
  );
};
