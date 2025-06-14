// Este script se ejecuta después de que el HTML ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // === SELECCIÓN DE ELEMENTOS DEL DOM ===
    // Obtenemos el botón para alternar el tema por su ID.
    const themeToggleButton = document.getElementById('theme-toggle');
    // Obtenemos el icono dentro del botón para poder cambiarlo.
    const themeIcon = themeToggleButton.querySelector('i');
    // Obtenemos el elemento raíz <html> para cambiar el atributo 'data-theme'.
    const htmlElement = document.documentElement;

    // === FUNCIÓN PARA ACTUALIZAR EL TEMA Y EL ICONO ===
    /**
     * Aplica el tema (oscuro o claro) y actualiza el estado visual del botón.
     * @param {string} theme - El tema a aplicar ('dark' o 'light').
     */
    const applyTheme = (theme) => {
        // 1. Aplicar el tema al HTML:
        //    Establecemos el atributo 'data-theme' en el elemento <html>.
        //    CSS utiliza este atributo (`[data-theme="light"]`) para aplicar los estilos correctos.
        htmlElement.setAttribute('data-theme', theme);
        
        // 2. Guardar la preferencia en localStorage:
        //    Esto asegura que la elección del usuario persista si recarga la página o la vuelve a visitar.
        localStorage.setItem('theme', theme);

        // 3. Actualizar el icono del botón:
        //    Cambiamos la clase del icono entre 'fa-sun' (sol) y 'fa-moon' (luna) según el tema.
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };
    
    // === FUNCIÓN PARA INICIALIZAR EL BOTÓN AL CARGAR LA PÁGINA ===
    /**
     * Determina el estado inicial del icono del botón basándose en el tema actual.
     */
    const initializeToggleButton = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.add('fa-moon');
        }
    };
    
    // Invocamos la función para que el botón tenga el icono correcto desde el principio.
    initializeToggleButton();

    // === EVENT LISTENER PARA EL CLIC EN EL BOTÓN ===
    // Añadimos un evento de clic al botón de cambio de tema.
    themeToggleButton.addEventListener('click', () => {
        // Obtenemos el tema actual leyendo el atributo 'data-theme' del <html>.
        const currentTheme = htmlElement.getAttribute('data-theme');
        // Determinamos el nuevo tema de forma ternaria: si el actual es 'dark', el nuevo será 'light', y viceversa.
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Llamamos a nuestra función para aplicar todos los cambios.
        applyTheme(newTheme);
    });

    // === EVENT LISTENER PARA CAMBIOS EN LA PREFERENCIA DEL SISTEMA ===
    // Escuchamos cambios en la preferencia de tema del sistema operativo (p. ej., si el usuario activa el modo oscuro en Windows/macOS/Android).
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Importante: Solo cambiamos el tema automáticamente si el usuario NO ha hecho una elección manual previa.
        // Verificamos si ya existe una preferencia guardada en localStorage.
        const userHasManuallySelectedTheme = localStorage.getItem('theme');
        
        if (!userHasManuallySelectedTheme) {
            // Si no hay selección manual, aplicamos el tema que el sistema ahora prefiere.
            const newSystemTheme = e.matches ? 'dark' : 'light';
            applyTheme(newSystemTheme);
        }
    });
});