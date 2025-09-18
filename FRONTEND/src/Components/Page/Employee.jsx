import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Api
import { getEmployee, deleteEmployee } from '../../Api/EmployeeManagement';

import ConfirmDeleteModal from "./ConfirmDeleteModal";


export default function Employees() {

  const [employeeData, setEmployeeData] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 5, totalPages: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  // FOR DELETE 
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [pagination.currentPage, pagination.itemsPerPage, searchTerm]);

  const fetchEmployees = async () => {
    let response = await getEmployee(pagination.currentPage, pagination.itemsPerPage, searchTerm);
    if (response.data.status === 200) {
      setEmployeeData(response.data.data);
      console.log("response data", response.data.data);
      if (response.data.pagination) {
        setPagination((prev) => ({
          ...prev,
          totalPages: response.data.pagination.totalPages,
        }));
      }
    }
  };

  const redirect = (mode, id) => {
    if (mode !== 'delete') {
      navigate(`/addemployee/${mode}/${id}`)
    }
    else {
      setSelectedId(id);
      setShowModal(true);
    }
  }


  const confirmDelete = async () => {
    const res = await deleteEmployee(selectedId);
    if (res.data.status === 200) {
      alert(res.data.message);
      setShowModal(false);
      fetchEmployees();
    }
    else {
      alert(res.data.message);
    }

  };

  return (
    <div className="container">

      <div className="d-flex justify-content-between align-items-center">
        <h3>Employee</h3>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Serach Input */}
          <div className="input-group me-3" style={{ maxWidth: "250px", height: "50px" }}>
            <span className="input-group-text bg-white">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          {/* Add Employee Button */}
          <button type="button" className="btn btn-primary" style={{ width: "300px", height: "50px" }}>
            <Link to="/addemployee" className="nav-link d-flex align-items-center">
              <i class="bi bi-plus-circle icon-class me-2"></i> Add New Employee
            </Link>
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Employee Name </th>
              <th scope="col">Employee Id</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Project</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {employeeData.length > 0 ? (
              employeeData.map((empObj) => (
                <tr key={empObj._id}>
                  <td>{empObj.Name}</td>
                  <td>{empObj.EmpId}</td>
                  <td>{empObj.Department}</td>
                  <td>{empObj.Designation}</td>
                  <td>{empObj.Project ? empObj.Project : '-'}</td>
                  <td>{empObj.Type}</td>
                  <td>{empObj.Status}</td>
                  <td>
                    {/* View */}
                    <button type="button" className="btn btn-sm me-1" title="View"
                      onClick={() => redirect('view', empObj._id)}>
                      <i className="bi bi-eye"></i>
                    </button>

                    {/* Edit */}
                    <button type="button" className="btn btn-sm me-1" title="Edit"
                      onClick={() => redirect('edit', empObj._id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    {/* Delete */}
                    <button type="button" className="btn btn-sm" title="Delete"
                      onClick={() => redirect('delete', empObj._id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>


                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">

        {/* Left side - Items per page */}
        <div className="d-flex align-items-center">
          <label className="me-2 mb-0">Items per page:</label>
          <select value={pagination.itemsPerPage} className="form-select form-select-sm" style={{ width: "80px" }}
            onChange={(e) => {
              setPagination((prev) => ({
                ...prev,
                itemsPerPage: Number(e.target.value),
                currentPage: 1 // reset to first page when page size changes
              }));
            }}>
            <option>2</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        {/* Right side - Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-end mb-0">
            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, idx) => (
              <li key={idx + 1} className={`page-item ${pagination.currentPage === idx + 1 ? "active" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPagination((prev) => ({
                    ...prev,
                    currentPage: idx + 1
                  }))}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

      </div>


      {/* Modal */}
      {
        showModal &&
        <ConfirmDeleteModal
          // show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      }


    </div>


  );
}
