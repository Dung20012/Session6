import React, { useState, useEffect } from 'react';
import ModalDelete from './ModalDelete';
import ModalErrorr from './ModalErrorr';

export default function TodoList() {
  // State để quản lý danh sách công việc
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // State để quản lý công việc đang nhập
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  // State để quản lý tab đang chọn
  const [activeTab, setActiveTab] = useState('all');
  // State để quản lý modal xác nhận xóa
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  
  // Xử lý sự kiện thêm công việc
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      setError('Tên công việc không được để trống!');
      return;
    }

    // Kiểm tra trùng tên công việc
    if (todos.some(todo => todo.name.toLowerCase() === newTodo.toLowerCase())) {
      setError('Tên công việc đã tồn tại!');
      return;
    }

    const newTodoItem = {
      id: Date.now(),
      name: newTodo,
      completed: false
    };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setNewTodo('');
    setError('');
  };

  // Xử lý sự kiện hoàn thành công việc
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Xử lý sự kiện xóa công việc
  const handleDelete = (id) => {
    setTodoToDelete(id);
    setShowModalDelete(true);
  };

  // Xử lý xác nhận xóa
  const confirmDelete = () => {
    const updatedTodos = todos.filter(todo => todo.id !== todoToDelete);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setShowModalDelete(false);  // Đóng modal sau khi xóa
  };

  // Lọc công việc theo tab
  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'completed') return todo.completed;
    if (activeTab === 'pending') return !todo.completed;
    return true; // 'all' tab, hiển thị tất cả công việc
  });

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Todo List</title>
      <link rel="stylesheet" href="./index.css" />
      {/* Font Awesome */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
      />
      {/* MDB */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.css"
        rel="stylesheet"
      />

      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleAddTodo}>
                    <div className="form-outline flex-fill">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>

                  {/* Hiển thị thông báo lỗi nếu có */}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                      >
                        Đã hoàn thành
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                      >
                        Chưa hoàn thành
                      </a>
                    </li>
                  </ul>

                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {filteredTodos.map((todo) => (
                          <li
                            key={todo.id}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                              />
                              {todo.completed ? <s>{todo.name}</s> : <span>{todo.name}</span>}
                            </div>
                            <div className="d-flex gap-3">
                              <i className="fas fa-pen-to-square text-warning" />
                              <i
                                className="far fa-trash-can text-danger"
                                onClick={() => handleDelete(todo.id)}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal xác nhận xóa */}
      {showModalDelete && (
        <ModalDelete
          onClose={() => setShowModalDelete(false)} // Đóng modal
          onConfirm={confirmDelete} // Xác nhận xóa
        />
      )}

      {/* Modal cảnh báo lỗi */}
      <ModalErrorr />
    </>
  );
}
