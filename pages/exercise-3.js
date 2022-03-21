import { Layout } from "../components/Layout";
import { useForm, usePlugin } from "tinacms";
import { buildFormOptions } from "../utils";
import initialValues from "../content/pages/exercise-3.json";

export default function Exercise({ initialValues, currentPath }) {
  const formOptions = buildFormOptions("Exercise 3", initialValues);
  const [data, form] = useForm(formOptions);
  usePlugin(form);

  return (
    <Layout currentPath={currentPath}>
      <div className="jumbotron">
        <div className="container-lg">
          <h1 className="display-4">
            <strong>Exercise 3</strong>
          </h1>
          <p className="lead">
            <strong className="font-weight-bold">
              Adjust the styles applied to the CSS classes in order to reveal a
              hidden image (and style it how you please!)
            </strong>
          </p>
          <ul className="lead">
            <li>
              Use the sidebar to edit the code for the content visible in the
              main section of the page
            </li>
            <li>
              Add colours to the CSS classes to see the image start to appear!
            </li>
          </ul>
        </div>
      </div>

      <div className="container-lg py-5">
        <div class="row">
          <div class="col-md-12 exercise-3">
            {data?.html && (
              <div dangerouslySetInnerHTML={{ __html: data.html }} />
            )}
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
      currentPath: "/exercise-3",
    },
  };
};
