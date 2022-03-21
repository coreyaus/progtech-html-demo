import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/exercise-1.json";

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Exercise 1", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      <div className="jumbotron">
        <div className="container-lg">
          <h1 className="display-4">
            <strong>Exercise 1</strong>
          </h1>
          <p className="lead">
            <strong className="font-weight-bold">
              Apply HTML &lt;tags&gt; to provide structure to the plain text on
              the left
            </strong>
          </p>
          <ul className="lead">
            <li>
              Use the sidebar to edit the code for the content visible in the
              box on the left hand side of the page
            </li>
            <li>
              The right hand side shows the goal for what you're hoping to
              achieve by adding HTML tags to the default plain-text content
            </li>
          </ul>
        </div>
      </div>

      <div className="container py-5">
        <div class="row">
          <div class="col-md-6">
            {data?.html && (
              <div dangerouslySetInnerHTML={{ __html: data.html }} />
            )}
          </div>
          <div class="col-md-6">
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
      currentPath: "/exercise-1",
    },
  };
};
