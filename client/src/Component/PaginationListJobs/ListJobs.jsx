function ListJobs({ total, pageNumber, getListJobs }) {
  const totalPages = Math.ceil(total / pageNumber);

  const goToPage = (page) => {
    getListJobs(page, pageNumber); // Gọi hàm getListJobs khi người dùng chuyển trang
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.map((page, i) => (
            <li key={i} className="page-item">
              <button className="page-link" onClick={() => goToPage(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ListJobs;
