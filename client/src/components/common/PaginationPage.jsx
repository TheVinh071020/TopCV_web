import React from "react";

function PaginationPage({ pageNumbers, goToPage, activePage }) {
 
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm">
          {pageNumbers.map((page, i) => (
            <li
              key={i}
              className={`page-item ${activePage === page ? "active" : ""}`}
              // aria-current={activePage === page ? "page" : ""}
            >
              <button className="page-link" onClick={() => goToPage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default PaginationPage;
