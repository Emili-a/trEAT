const requestRegister = (fullName, username, password) => fetch('http://localhost:8000/users/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ fullName, username, password }),
});

export default requestRegister;
