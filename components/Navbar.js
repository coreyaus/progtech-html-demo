import Link from "next/link";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Presentation",
    href: "https://slides.com/d/zvakt48/live",
    target: "_blank",
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
    text: "Exercise 4",
    href: "/exercise-4",
  },
  {
    text: "Resources",
    links: [
      {
        text: "HTML Cheatsheet",
        href: "https://assets.nationbuilder.com/codenation/pages/33899/attachments/original/1647992738/HTML-Cheatsheet.pdf?1647992738",
        target: "_blank",
      }, 
      {
        text: "CSS Cheatsheet",
        href: "https://assets.nationbuilder.com/codenation/pages/33674/attachments/original/1666063213/css-cheatsheet.pdf_-_css-cheatsheet.pdf?1666063213",
        target: "_blank",
      }
    ]
  },
];

const linkElement = ({ href, text, target }, isCurrentPage, className) => {
  if (href === "/" || target === "_blank") {
    return (
      <a href={href} className={`nav-link ${className}`} target={target}>
        {text}
        {isCurrentPage && <span className="sr-only">(current)</span>}
      </a>
    );
  }

  return (
    <Link key={href} href={href}>
      <a className={`nav-link ${className}`}>
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
                if (Object.keys(link).includes("links")) {
                  const dropDownURLS = []
                  link.links.map(l => dropDownURLS.push(l.href))
                  const isCurrentPage = dropDownURLS.includes(currentPath)
                  return (
                    <li className={`nav-item dropdown ${index === 0 ? "mr-2" : "mx-2"}`}>
                      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">
                        {link.text}
                      </a>
                      <div class="dropdown-menu text-dark">
                        {link.links.map(l => (
                          linkElement(l, isCurrentPage, 'text-dark dropdown-item')
                        ))}
                      </div>
                    </li>
                  )
                }
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
