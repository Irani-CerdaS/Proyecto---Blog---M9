document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    if (!newsId) {
        document.getElementById('news-container').innerHTML = '<div class="alert alert-danger mx-5 mt-5 text-center">No se especificó la noticia a buscar.</div>';
        return;
    }

    fetchNewsDetail(newsId);
    setupAuthNavbar();
    setupCommentForm(newsId);
});

// Función central para buscar y renderizar la Noticia
async function fetchNewsDetail(id) {
    try {
        const response = await fetch(`${config.API_URL}/news/${id}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error('Noticia no encontrada');
            throw new Error('Error de red al cargar la noticia');
        }

        const item = await response.json();
        
        // Formateador de Fecha
        const formattedDate = new Date(item.createdAt).toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'long', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });

        // Imagen: la solicitada o un placeholder
        const imgSrc = item.image ? item.image : 'https://placehold.co/1200x500/f5f5f7/1d1d1f?text=NewsBlog';
        const category = item.category || 'General';
        const author = item.User?.username || 'Redacción';

        // Render Principal de Noticia
        document.getElementById('news-container').innerHTML = `
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="news-header">
                        <div>
                            <span class="news-category-badge text-primary">${category}</span>
                            <span class="news-metadata">Por <strong class="text-dark">${author}</strong> • ${formattedDate}</span>
                        </div>
                        <h1 class="fw-bold mt-3 lh-sm" style="font-size: 2.8rem; letter-spacing: -1px;">${item.title}</h1>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <img src="${imgSrc}" class="news-hero-img shadow-sm" alt="Hero">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="news-content">${item.content}</div>
                </div>
            </div>
        `;

        // Render de Comentarios
        document.getElementById('comments-section-wrapper').classList.remove('d-none');
        renderComments(item.Comments);

    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('news-container').innerHTML = `
            <div class="alert alert-danger mx-auto mt-5 text-center" style="max-width: 500px">
                <h4 class="alert-heading">Problema técnico</h4>
                <p class="mb-0">${error.message}</p>
                <div class="mt-3"><a href="/" class="btn btn-outline-danger btn-sm">Volver al Inicio</a></div>
            </div>`;
    }
}

// Función secundaria que arma la parte de comentarios en el HTML
function renderComments(commentsList = []) {
    const listContainer = document.getElementById('comments-list');
    document.getElementById('comments-count').textContent = commentsList.length;

    if (commentsList.length === 0) {
        listContainer.innerHTML = '<p class="text-muted text-center pt-3 pb-4 mb-0 bg-light rounded-3" style="font-style: italic;">No hay comentarios todavía. Sé el primero.</p>';
        return;
    }

    listContainer.innerHTML = ''; // Limpiar
    commentsList.forEach(comment => {
        const commentDate = new Date(comment.createdAt).toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });
        const cAuthor = comment.User?.username || 'Usuario';
        
        listContainer.innerHTML += `
            <div class="comment-item">
                <div class="d-flex justify-content-between mb-2">
                    <strong class="text-dark">${cAuthor}</strong>
                    <span class="text-muted small">${commentDate}</span>
                </div>
                <p class="mb-0" style="color: #444">${comment.text}</p>
            </div>
        `;
    });
}

// Verifica Auth y configura la Navbar + Formulario de Comentarios
function setupAuthNavbar() {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById('auth-section');

    if (token) {
        // En la navbar mostramos el publicador y Salir
        authSection.innerHTML = `
            <a class="nav-link text-primary fw-bold" href="/postear.html">Escribir Noticia</a>
            <a class="nav-link text-danger ms-2" href="#" onclick="logout(event)">Salir</a>
        `;

        // En la sección de comentarios ocultamos el login prompt y mostramos el form
        document.getElementById('login-prompt').classList.add('d-none');
        document.getElementById('comment-form-container').classList.remove('d-none');
    } else {
        // Mostrar "Acceder"
        authSection.innerHTML = '<a class="nav-link text-primary fw-bold" href="/login.html">Acceder</a>';
    }
}

// Maneja el Submit del nuevo comentario
function setupCommentForm(newsId) {
    const form = document.getElementById('comment-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('comment-text').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        const token = localStorage.getItem('token');

        if (!text.trim()) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        document.getElementById('comment-error').classList.add('d-none');

        try {
            const response = await fetch(`${config.API_URL}/news/${newsId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Server Error');
            }

            // Éxito: limpiar caja de texto y recargar la página limpia
            document.getElementById('comment-text').value = '';
            fetchNewsDetail(newsId); // Recarga para traer y redibujar todos
            
        } catch (error) {
            console.error('Submit comment error:', error);
            document.getElementById('comment-error').textContent = error.message || 'No se pudo enviar.';
            document.getElementById('comment-error').classList.remove('d-none');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Comentar';
        }
    });
}

function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
}
