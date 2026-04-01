document.addEventListener('DOMContentLoaded', () => {
    
    // FORMULARIO DE LOGIN
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorAlert = document.getElementById('error-alert');

            try {
                const response = await fetch(`${config.API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardar token JWT
                    localStorage.setItem('token', data.token);
                    // Redirigir al inicio
                    window.location.href = '/';
                } else {
                    errorAlert.textContent = data.error || 'Credenciales incorrectas';
                    errorAlert.classList.remove('d-none');
                }
            } catch (error) {
                console.error(error);
                errorAlert.textContent = 'Fallo de conexión crítico';
                errorAlert.classList.remove('d-none');
            }
        });
    }

    // FORMULARIO DE REGISTRO
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorAlert = document.getElementById('error-alert');

            try {
                const response = await fetch(`${config.API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Usuario creado con éxito. Por favor, inicia sesión.');
                    window.location.href = '/login.html';
                } else {
                    errorAlert.textContent = data.error || 'No se pudo crear el usuario';
                    errorAlert.classList.remove('d-none');
                }
            } catch (error) {
                console.error(error);
                errorAlert.textContent = 'Fallo de conexión crítico al servidor';
                errorAlert.classList.remove('d-none');
            }
        });
    }
});
