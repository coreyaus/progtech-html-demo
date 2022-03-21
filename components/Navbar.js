import Link from "next/link";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Playground",
    href: "/playground",
  },
];

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
                  <li className={`nav-item ${isCurrentPage && "active"}`}>
                    <Link key={index} href={link.href}>
                      <a className="nav-link">
                        {link.text}
                        {isCurrentPage && (
                          <span className="sr-only">(current)</span>
                        )}
                      </a>
                    </Link>
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
