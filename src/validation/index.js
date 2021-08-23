import validator from 'validator';

export const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return <span className="error" style={{ fontSize: 12, color: "red" }}>Không được để trống</span>;
    }
};