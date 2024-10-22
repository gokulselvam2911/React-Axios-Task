import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Holds the user being edited
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching
  const [isSaving, setIsSaving] = useState(false); // Loading state for saving
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for deleting
  const [deleteUserId, setDeleteUserId] = useState(null); // Track which user is being deleted

  const editFormRef = useRef(null); // Reference to the EditUser form

  // Fetch users from the API
  const fetchUsers = () => {
    setIsLoading(true); // Set loading to true while fetching users
    axios
      .get("https://6716a7d63fcb11b265d33f1b.mockapi.io/crud-mock-api")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setIsLoading(false)); // Stop loading after fetching
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user to the API
  const addUser = (newUser) => {
    setIsSaving(true); // Start saving process
    axios
      .post("https://6716a7d63fcb11b265d33f1b.mockapi.io/crud-mock-api", newUser)
      .then(() => {
        fetchUsers(); // Refresh user list after adding
      })
      .catch((error) => console.error("Error adding user:", error))
      .finally(() => setIsSaving(false)); // Stop saving process
  };

  // Update user in the API
  const updateUser = (userId, updatedUser) => {
    setIsSaving(true); // Start saving process
    axios
      .put(`https://6716a7d63fcb11b265d33f1b.mockapi.io/crud-mock-api/${userId}`, updatedUser)
      .then(() => {
        setEditingUser(null); // Exit edit mode
        fetchUsers(); // Refresh user list after editing
      })
      .catch((error) => {
        console.error(`Error updating user with ID ${userId}:`, error);
        alert(`Failed to update user. User with ID ${userId} may not exist.`);
      })
      .finally(() => setIsSaving(false)); // Stop saving process
  };

  // Delete user from the API
  const deleteUser = (userId) => {
    setIsDeleting(true); // Start deleting process
    setDeleteUserId(userId); // Track the user being deleted
    axios
      .delete(`https://6716a7d63fcb11b265d33f1b.mockapi.io/crud-mock-api/${userId}`)
      .then(() => {
        fetchUsers(); // Refresh user list after deletion
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);
        alert(`Failed to delete user. User with ID ${userId} may not exist.`);
      })
      .finally(() => {
        setIsDeleting(false); // Stop deleting process
        setDeleteUserId(null); // Clear delete tracking
      });
  };

  const handleEditClick = (user) => {
    setEditingUser(user); // Set the user to edit
    // Optionally scroll down to the edit form if you keep it below the add form
    // If you want the edit form always on top, you can remove this scroll logic
    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container-fluid">
      <header>
        <h1 className="my-4">User Management App</h1>
      </header>

      <main>
        {/* Show EditUser form at the top if editing, otherwise show AddUser form */}
        {editingUser ? (
          <div ref={editFormRef}>
            <EditUser
              user={editingUser}
              onUpdateUser={updateUser}
              onCancelEdit={() => setEditingUser(null)}
              isLoading={isSaving}
            />
          </div>
        ) : (
          <AddUser onUserAdded={addUser} isLoading={isSaving} />
        )}

        {/* User List */}
        <br />
        <div className="table-responsive">
          <h3>User List</h3>
          {isLoading ? (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <section>
              <table className="table table-striped mt-4">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td data-label="ID">{user.id}</td>
                      <td data-label="First Name">{user.firstName}</td>
                      <td data-label="Last Name">{user.lastName}</td>
                      <td data-label="Username">@{user.username}</td>
                      <td data-label="City">{user.city}</td>
                      <td data-label="State">{user.state}</td>
                      <td data-label="Zip">{user.zip}</td>
                      <td data-label="Actions">
                        <button
                          className="btn btn-primary btn-sm mx-1"
                          onClick={() => handleEditClick(user)}
                          disabled={isSaving || isDeleting}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm mx-1"
                          onClick={() => deleteUser(user.id)}
                          disabled={isDeleting && deleteUserId === user.id}
                        >
                          {isDeleting && deleteUserId === user.id ? (
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          ) : (
                            <FaTrash />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
export default App;
