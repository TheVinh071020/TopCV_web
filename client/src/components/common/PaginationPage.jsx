import React from "react";

function PaginationPage({ pageNumbers, goToPage }) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm">
          {pageNumbers.map((page, i) => (
            <li key={i} className="page-item " aria-current="page">
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
