import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/exercise-2.json";

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Exercise 2", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      <div className="jumbotron">
        <div className="container-lg">
          <h1 className="display-4">
            <strong>Exercise 2</strong>
          </h1>
          <p className="lead">
            <strong className="font-weight-bold">
              Customise the design of your content by adding inlines styles to
              the base HTML. Set text and background colours, adjust sizes and
              more!
            </strong>
          </p>
          <ul className="lead pb-2">
            <li>
              Use the sidebar to edit the code for the content visible in the
              box on the left hand side of the page
            </li>
            <li>
              The right hand side shows the goal for what you're hoping to
              achieve by adding HTML tags to the default plain-text content
            </li>
          </ul>
          <h4 className="font-weight-bold">Tasks</h4>
          <ol className="lead">
            <li>Change the width of the iframe to 600px and height to 400px</li>
            <li>Change the color Heading 3 to red</li>
            <li>Change the width of the image to 60%</li>
            <li>Change strong text to blue</li>
            <li>
              Change the padding Heading 1 to 10px, background color green and
              color white.
            </li>
            <li>
              <p>
                <strong className="font-weight-bold">
                  Optional HTML challenges
                </strong>
              </p>
              <ul>
                <li>
                  Change the "src" of the &lt;img&gt; so it uses the URL of a
                  different image
                </li>
                <li>
                  Change the embedded video to your favourite nostalgic Aussie
                  rock song of the 1980s
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            {data?.html && (
              <div dangerouslySetInnerHTML={{ __html: data.html }} />
            )}
          </div>
          <div className="col-md-6">
            <div dangerouslySetInnerHTML={{ __html: initialValues.goal }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      initialValues,
      currentPath: "/exercise-2",
    },
  };
};
