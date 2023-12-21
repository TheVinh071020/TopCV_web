import React from "react";

function UserAdmin() {
  return (
    <div className="container mt-3  ">
      <div style={{ width: "97%" }}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Quản lý người dùng</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>555</td>
              <td>555</td>
              <td>555</td>
              <td>555</td>
              <td>
                <button type="button" className="btn btn-success">
                  Block
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAdmin;
