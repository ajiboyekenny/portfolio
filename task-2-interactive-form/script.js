const form = document.querySelector('#signup-form');
const success = document.querySelector('#success');
const fields = ['fullName', 'email', 'phone', 'password'];
const checks = [
  ['8+ characters', (value) => value.length >= 8],
  ['Uppercase letter', (value) => /[A-Z]/.test(value)],
  ['Lowercase letter', (value) => /[a-z]/.test(value)],
  ['Number', (value) => /[0-9]/.test(value)],
  ['Symbol', (value) => /[^A-Za-z0-9]/.test(value)],
];
const errors = {
  fullName(value) {
    if (!value.trim()) return 'Full name is required';
    if (value.trim().length < 2) return 'Full name must be at least 2 characters';
    return /^[\p{L}' .-]+$/u.test(value.trim()) ? '' : 'Use letters, spaces, apostrophes or hyphens only';
  },
  email(value) {
    if (!value.trim()) return 'Email is required';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address';
  },
  phone(value) {
    if (!value.trim()) return 'Phone number is required';
    const digits = value.replace(/\D/g, '').length;
    return /^\+?[0-9\s-]{7,20}$/.test(value.trim()) && digits >= 7 && digits <= 15 ? '' : 'Phone number must have 7–15 digits';
  },
  password(value) {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[a-z]/.test(value)) return 'Add a lowercase letter';
    if (!/[A-Z]/.test(value)) return 'Add an uppercase letter';
    return /[0-9]/.test(value) ? '' : 'Add a number';
  },
};

function validate(name, showError = true) {
  const input = document.querySelector(`#${name}`);
  const field = input.closest('.field');
  const error = errors[name](input.value);
  field.classList.toggle('invalid', Boolean(error) && showError);
  field.classList.toggle('is-valid', !error && Boolean(input.value));
  document.querySelector(`#${name}-error`).textContent = showError ? error : '';
  updateProgress();
  return !error;
}

function updateProgress() {
  const complete = fields.filter((name) => !errors[name](document.querySelector(`#${name}`).value)).length;
  document.querySelector('#progress-count').textContent = `${complete}/4 complete`;
  document.querySelector('#progress-bar').style.width = `${complete * 25}%`;
}

function updateStrength() {
  const value = document.querySelector('#password').value;
  const score = checks.filter(([, test]) => test(value)).length;
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
  const box = document.querySelector('#strength');
  box.hidden = !value;
  box.querySelectorAll('.bars i').forEach((bar, index) => bar.classList.toggle('on', index < score));
  document.querySelector('#strength-label').textContent = labels[score];
  document.querySelector('#checks').innerHTML = checks.map(([label, test]) => `<li class="${test(value) ? 'ok' : ''}">${test(value) ? '✓' : '×'} ${label}</li>`).join('');
}

fields.forEach((name) => {
  const input = document.querySelector(`#${name}`);
  input.addEventListener('focus', () => document.querySelector('#editing-label').textContent = 'Editing…');
  input.addEventListener('blur', () => { document.querySelector('#editing-label').textContent = 'Progress'; validate(name); });
  input.addEventListener('input', () => { if (input.closest('.field').classList.contains('invalid')) validate(name); else updateProgress(); if (name === 'password') updateStrength(); });
});

document.querySelector('#toggle-password').addEventListener('click', (event) => {
  const password = document.querySelector('#password');
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  event.currentTarget.textContent = showing ? 'Show' : 'Hide';
  event.currentTarget.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = fields.map((name) => validate(name)).every(Boolean);
  if (!valid) { document.querySelector('#form-message').hidden = false; document.querySelector('#form-message').textContent = 'Please correct the highlighted fields.'; document.querySelector('.field.invalid input').focus(); return; }
  document.querySelector('#form-message').hidden = true;
  document.querySelector('#first-name').textContent = document.querySelector('#fullName').value.trim().split(/\s+/)[0];
  form.hidden = true;
  success.hidden = false;
});

document.querySelector('#another').addEventListener('click', () => {
  form.reset();
  fields.forEach((name) => document.querySelector(`#${name}`).closest('.field').classList.remove('invalid', 'is-valid'));
  updateProgress(); updateStrength(); success.hidden = true; form.hidden = false; document.querySelector('#fullName').focus();
});
