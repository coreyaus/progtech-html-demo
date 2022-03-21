import Link from "next/link";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Exercise 1",
    href: "/exercise-1",
  },
  {
    text: "Exercise 2",
    href: "/exercise-2",
  },
  {
    text: "Exercise 3",
    href: "/exercise-3",
  },
  {
    text: "Presentation",
    href: "https://www.codenation.com/presentation",
  },
  {
    text: "Playground",
    href: "/playground",
  },
];

const linkElement = ({ href, text }, isCurrentPage) => {
  if (href === "/") {
    return (
      <a href={href} className="nav-link">
        {text}
        {isCurrentPage && <span className="sr-only">(current)</span>}
      </a>
    );
  }

  return (
    <Link key={href} href={href}>
      <a className="nav-link">
        {text}
        {isCurrentPage && <span className="sr-only">(current)</span>}
      </a>
    </Link>
  );
};

export const Navbar = ({ currentPath }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-lg">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              {links.map((link, index) => {
                const isCurrentPage = link.href === currentPath;
                return (
                  <li
                    className={`nav-item ${index === 0 ? "mr-2" : "mx-2"} ${
                      isCurrentPage ? "active" : ""
                    }`}
                  >
                    {linkElement(link, isCurrentPage)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
