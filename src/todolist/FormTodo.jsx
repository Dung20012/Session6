import React, { useState, useEffect } from 'react';
import ModalDeletes from './ModalDeletes';
import ModalBlock from './ModalBlock';

export default function FormTodo() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    dob: '',
  });

  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')) || []);
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(''); // 'block' or 'unblock'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Validate inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', dob: '' };

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Họ và tên không được để trống.';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.trim()) {
      newErrors.email = 'Email không được để trống.';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email không hợp lệ.';
      isValid = false;
    }

    // Validate date of birth
    if (!dob) {
      newErrors.dob = 'Ngày sinh không được để trống.';
      isValid = false;
    } else if (new Date(dob) > new Date()) {
      newErrors.dob = 'Ngày sinh không được lớn hơn ngày hiện tại.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newEmployee = {
      id: Date.now(),
      name,
      dob,
      email,
      address,
    };

    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    if (selectedEmployee) {
      // Update existing employee
      const updatedEmployees = storedEmployees.map(employee =>
        employee.id === selectedEmployee.id ? newEmployee : employee
      );
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    } else {
      // Add new employee
      storedEmployees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(storedEmployees));
    }

    setName('');
    setDob('');
    setEmail('');
    setAddress('');
    setErrors({ name: '', email: '', dob: '' });
    setIsFormVisible(false);
    setSelectedEmployee(null); // Reset selected employee
  };

  // Open form with existing employee data for editing
  const handleEditClick = (employee) => {
    setName(employee.name);
    setDob(employee.dob);
    setEmail(employee.email);
    setAddress(employee.address);
    setSelectedEmployee(employee);
    setIsFormVisible(true);
  };

  // Open modal for block/unblock
  const handleBlockUnblockClick = (employee, action) => {
    setSelectedEmployee(employee);
    setModalAction(action);
    setIsModalVisible(true);
  };

  // Handle modal confirm block/unblock
  const handleModalConfirm = () => {
    if (selectedEmployee) {
      // Simulate block/unblock action (you can update employee status in your data)
      console.log(`${modalAction === 'block' ? 'Blocked' : 'Unblocked'} employee: ${selectedEmployee.name}`);
      setIsModalVisible(false);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Handle delete employee
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem('employees')) || []);
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link rel="stylesheet" href="./index.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />

      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button
              className="btn btn-primary"
              onClick={() => setIsFormVisible(true)}
            >
              Thêm mới nhân viên
            </button>
          </header>

          {/* Search bar */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn A</td>
                <td>28/02/1990</td>
                <td>nva@gmail.com</td>
                <td>Ba Đình, Hà Nội</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="status status-active" />
                    <span> Đang hoạt động</span>
                  </div>
                </td>
                <td>
                  <span
                    className="button button-block"
                    onClick={() => handleBlockUnblockClick({ name: "Nguyễn Văn A" }, "block")}
                  >
                    Chặn
                  </span>
                </td>
                <td>
                  <span
                    className="button button-edit"
                    onClick={() => handleEditClick({ id: 1, name: "Nguyễn Văn A", dob: "1990-02-28", email: "nva@gmail.com", address: "Ba Đình, Hà Nội" })}
                  >
                    Sửa
                  </span>
                </td>
                <td>
                  <span
                    className="button button-delete"
                    onClick={() => handleDeleteClick({ id: 1, name: "Nguyễn Văn A", dob: "1990-02-28", email: "nva@gmail.com", address: "Ba Đình, Hà Nội" })}
                  >
                    Xóa
                  </span>
                </td>
              </tr>
              {/* Loop through filtered employees */}
              {filteredEmployees.length > 0 ? filteredEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="status status-active" />
                      <span> Đang hoạt động</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="button button-block"
                      onClick={() => handleBlockUnblockClick(employee, "block")}
                    >
                      Chặn
                    </span>
                  </td>
                  <td>
                    <span
                      className="button button-edit"
                      onClick={() => handleEditClick(employee)}
                    >
                      Sửa
                    </span>
                  </td>
                  <td>
                    <span
                      className="button button-delete"
                      onClick={() => handleDeleteClick(employee)}
                    >
                      Xóa
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    Không có kết quả tìm kiếm
                  </td>
                </tr>
              )}
            </thead>
            <tbody>
              {/* Dynamic rows will be rendered here */}
            </tbody>
          </table>
        </main>
      </div>

      {/* Form thêm mới nhân viên */}
      {isFormVisible && (
        <div className="overlay">
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
              <h4>{selectedEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm mới nhân viên'}</h4>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setIsFormVisible(false)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="form-text error">{errors.name}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              {errors.dob && <div className="form-text error">{errors.dob}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="form-text error">{errors.email}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <button className="w-100 btn btn-primary">{selectedEmployee ? 'Cập nhật' : 'Thêm mới'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal xác nhận xóa tài khoản */}
      {isModalVisible && (
        <ModalDeletes
          onCancel={() => setIsModalVisible(false)}
          onConfirm={() => {
            // Perform delete action here
            console.log('Deleted employee:', selectedEmployee);
            setIsModalVisible(false);
          }}
        />
      )}
    </>
  );
}
