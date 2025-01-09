import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from './data.json'; // Import the JSON data

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter data based on search term for multiple fields (Department, Involvement, District, Activity)
  const filteredData = data.filter((row) => {
    return (
      row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.involvement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.activity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="container-fluid mt-5">
      <h3 className="mb-3 text-center">Unified Convergence Portal</h3>

      {/* <div className="row mb-3">
        <div className="col-md-6 col-12 d-flex justify-content-between align-items-center">
          <span className="mr-3">My work List</span>
        </div>
        <div className="col-md-6 col-12 d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-warning mx-2">Export As</button>
        <button className="btn btn-success">ADD</button>
      </div> */}
      <div className="row mb-3">
  {/* "My work List" text */}
  <div className="col-md-4 col-6 d-flex align-items-center">
    <span>My work List</span>
  </div>

  {/* Search input */}
  <div className="col-md-4 col-6 d-flex align-items-center">
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to page 1 when searching
      }}
    />
  </div>

  {/* Buttons */}
  <div className="col-md-4 col-12 d-flex justify-content-end align-items-center">
    <button className="btn btn-warning mx-2">Export As</button>
    <button className="btn btn-success">ADD</button>
  </div>
</div>


      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>SL#</th>
              <th>Financial Year</th>
              <th>Department</th>
              <th>Involvement</th>
              <th>District</th>
              <th>Activity</th>
              <th>SHG(s) Involved</th>
              <th>SHG(s) Undergone Training</th>
              <th>Quantity of Commodity</th>
              <th>Turnover</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.year}</td>
                  <td>{row.department}</td>
                  <td>{row.involvement}</td>
                  <td>{row.district}</td>
                  <td>{row.activity}</td>
                  <td>{row.shgInvolved}</td>
                  <td>{row.shgTrained}</td>
                  <td>{row.quantity}</td>
                  <td>{row.turnover}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No matching entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and Rows per Page */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>Entries found: {filteredData.length}</span>
        <div className="d-flex align-items-center">
          <span className="mr-2">Rows per page:</span>
          <select
            className="form-control d-inline-block w-auto"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to page 1
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;
