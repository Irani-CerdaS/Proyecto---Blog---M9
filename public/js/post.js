document.addEventListener('DOMContentLoaded', () => {
    // Redirigir a login si no hay token
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return; // Detener ejecución si no está logueado
    }

    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const image = document.getElementById('image').value;
            const content = document.getElementById('content').value;
            const errorAlert = document.getElementById('error-alert');

            try {
                const response = await fetch(`${config.API_URL}/news`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Token en la cabecera
                    },
                    body: JSON.stringify({ title, category, image, content })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Noticia publicada exitosamente');
                    window.location.href = '/'; // Redirigir al home tras publicar
                } else {
                    errorAlert.textContent = data.error || 'No se pudo publicar la noticia';
                    errorAlert.classList.remove('d-none');
                }
            } catch (error) {
                console.error('Error al publicar:', error);
                errorAlert.textContent = 'Fallo de conexión crítico al servidor';
                errorAlert.classList.remove('d-none');
            }
        });
    }
});

function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
}
