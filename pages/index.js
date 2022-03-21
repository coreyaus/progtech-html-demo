import Link from "next/link";
import { Layout } from "../components/Layout";
import initialValues from "../content/pages/home.json";

const exercises = [
  {
    name: "Exercise 1",
    headline: "HTML Structure",
    description:
      "Take some plain text and add HTML <tags> to structure the content. Include image, links and embedded videos too!",
    link: "exercise-1",
  },
  {
    name: "Exercise 2",
    headline: "CSS - using inline styles",
    description:
      "Customise the design of your content by adding inlines styles to your HTML. Set text and background colours, adjust sizes and more!",
    link: "exercise-2",
  },
  {
    name: "Exercise 3",
    headline: "CSS - using classes",
    description:
      "Adjust the styles applied to various CSS classes in order to reveal a hidden image (and style it how you please!)",
    link: "exercise-3",
  },
  {
    name: "Exercise 4",
    headline: "CSS - using a framework/theme",
    description: "Coming soon!",
    link: "",
  },
];

export default function Home({ initialValues: data, currentPath }) {
  return (
    <Layout currentPath={currentPath}>
      {data?.blocks?.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
      ))}

      {exercises.length > 0 && (
        <div className="container-lg py-5">
          <div className="row row-cols-1 row-cols-lg-2">
            {exercises.map(({ name, headline, description, link }) => (
              <div key={link} className="col mb-4">
                <div className="card">
                  <h4 className="card-header">{name}</h4>
                  <div className="card-body">
                    <h5 className="card-title">{headline}</h5>
                    <p className="card-text">{description}</p>
                    {link && (
                      <Link href={`/${link}`}>
                        <a className="btn btn-primary">Bring it on</a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      initialValues,
      currentPath: "/",
    },
  };
};
