# Task 2 — Interactive Form

A responsive registration form built with semantic HTML, CSS, and vanilla JavaScript. The standalone version demonstrates all frontend requirements without sending personal data anywhere.

## Frontend features
- Full Name, Email, Phone, and Password fields
- Required-field, email-format, phone, and password validation
- Validation on focus/blur and while correcting invalid fields
- Five-stage password-strength indicator and checklist
- Show/hide password control
- Dynamic progress, error messages, and success feedback
- Responsive purple, light-blue, and white design
- SEO and social metadata

## Backend used by the live app
The live version includes a server endpoint that:
1. validates the same rules again with Zod;
2. hashes the password using PBKDF2, SHA-256, a random salt, and 100,000 iterations;
3. inserts only the hashed password and validated contact fields into PostgreSQL;
4. returns a success/error response to the form.

The database definition is included in `schema.sql`. No private database credentials are included in this submission.

## Run locally
Open `index.html` in a browser. No installation is required. Use the live application link supplied with the internship submission to test real backend storage.
