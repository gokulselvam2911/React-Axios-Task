import { useState } from "react";
import PropTypes from "prop-types";

const AddUser = ({ onUserAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Validation states
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!zip) newErrors.zip = "Zip code is required.";
    else if (!/^\d{6}$/.test(zip)) newErrors.zip = "Zip code must be 6 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Set loading to true when submitting
      const newUser = { firstName, lastName, username, city, state, zip };

      try {
        await onUserAdded(newUser); // Assume this is an async operation
        setFirstName("");
        setLastName("");
        setUsername("");
        setCity("");
        setState("");
        setZip("");
      } catch (error) {
        console.error("Error adding user", error);
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    }
  };

  return (
    <div className="mt-4">
      <h3>Add New User</h3>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
        {/* First Name Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustom01" className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
        </div>

        {/* Last Name Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustom02" className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
        </div>

        {/* Username Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustomUsername" className="form-label">Username</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@</span>
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {errors.username && <small className="text-danger">{errors.username}</small>}
        </div>

        {/* City Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustom03" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>

        {/* State Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustom04" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom04"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && <small className="text-danger">{errors.state}</small>}
        </div>

        {/* Zip Input */}
        <div className="col-12 col-md-6">
          <label htmlFor="validationCustom05" className="form-label">Zip</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
          {errors.zip && <small className="text-danger">{errors.zip}</small>}
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button className="btn btn-success" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              "Add User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

AddUser.propTypes = {
  onUserAdded: PropTypes.func.isRequired,
};

export default AddUser;
