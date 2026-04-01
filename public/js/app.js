document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    checkAuthStatus();
});

// Función para obtener noticias del backend
async function fetchNews() {
    const container = document.getElementById('news-container');
    
    try {
        const response = await fetch(`${config.API_URL}/news`);
        if (!response.ok) throw new Error('Error de red al cargar noticias');
        
        const news = await response.json();
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        if (news.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted"><p>No hay noticias publicadas aún.</p></div>';
            return;
        }

        // Renderizar dinámicamente
        news.forEach(item => {
            // Formatear la fecha
            const dateObj = new Date(item.createdAt);
            const formattedDate = dateObj.toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            // Imagen o placeholder estilo Apple
            const imgSrc = item.image ? item.image : 'https://placehold.co/600x400/f5f5f7/1d1d1f?text=NewsBlog';

            // HTML de la tarjeta
            const cardHTML = `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <img src="${imgSrc}" class="card-img-top" alt="${item.title}">
                        <div class="card-body d-flex flex-column">
                            <span class="news-category">${item.category || 'General'}</span>
                            <h3 class="card-title">
                                <a href="/detalle.html?id=${item.id}">${item.title}</a>
                            </h3>
                            <div class="mt-auto pt-3 d-flex justify-content-between align-items-center">
                                <span class="news-date">${formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = '<div class="col-12 text-center text-danger"><p>Ocurrió un error al cargar las noticias.</p></div>';
    }
}

// Verifica si el usuario está logueado para cambiar la Navbar
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById('auth-section');
    
    if (token) {
        authSection.innerHTML = `
            <a class="nav-link text-primary fw-bold" href="/postear.html">Escribir Noticia</a>
            <a class="nav-link text-danger ms-2" href="#" onclick="logout(event)">Salir</a>
        `;
    }
}

function logout(e) {
    if(e) e.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
}
