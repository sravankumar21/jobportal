// EditableRow.js
import React from 'react';

const EditableRow = ({ editFormData, handleUpdateClick }) => {
  return (
    <div className="editable-row">
      <div className="form-group">
        <label>Internship Title:</label>
        <input
          type="text"
          value={editFormData.internshipTitle}
          onChange={(e) => handleUpdateClick({ ...editFormData, internshipTitle: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Internship Type:</label>
        <input
          type="text"
          value={editFormData.internshipType}
          onChange={(e) => handleUpdateClick({ ...editFormData, internshipType: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Internship Description:</label>
        <textarea
          value={editFormData.internshipDescription}
          onChange={(e) => handleUpdateClick({ ...editFormData, internshipDescription: e.target.value })}
        ></textarea>
      </div>

      {/* Add other form fields as needed */}

      <button onClick={() => handleUpdateClick(editFormData)}>Save</button>
    </div>
  );
};

export default EditableRow;
