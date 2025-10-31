// 1. NOTIFICATION SYSTEM
function showNotification(message, type = 'warning', title = '') {
    const container = document.getElementById('notification-container');
    
    // Emojis según el tipo
    const icons = {
        warning: '⚠️',
        error: '❌',
        success: '✅',
        info: 'ℹ️'
    };
    
    const titles = {
        warning: title || 'Atención',
        error: title || 'Error',
        success: title || 'Éxito',
        info: title || 'Información'
    };
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">${icons[type]}</div>
        <div class="notification-content">
            <div class="notification-title">${titles[type]}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        notification.classList.add('hiding');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// 2. DATA: Tasa de Interrupción por Región
const regionData = {
    "Madre de Dios": 10,
    "Lambayeque": 10,
    "Arequipa": 10,
    "Cusco": 10,
    "Pasco": 10,
    "Lima y Callao": 7,
    "Junín": 7,
    "Ayacucho": 7,
    "Tacna": 7,
    "Puno": 7,
    "Huánuco": 5,
    "Ucayali": 5,
    "La Libertad": 5,
    "Moquegua": 5,
    "Ica": 2,
    "Huancavelica": 2,
    "Loreto": 2,
    "Tumbes": 2,
    "Cajamarca": 2,
    "Piura": 0,
    "Ancash": 0,
    "Apurímac": 0,
    "Amazonas": 0,
    "San Martín": 0
};

// 2. DATA: Universidades con datos CORRECTOS según documentos oficiales
const universidadData = {
    // GRUPO 1 (15 puntos clasificación)
    "Universidad Nacional Mayor De San Marcos": { region: "Lima", grupo: 1, puntaje_S: 10 },
    "Universidad Nacional Del Centro Del Peru": { region: "Junín", grupo: 1, puntaje_S: 9 },
    "Universidad Nacional De La Amazonia Peruana": { region: "Loreto", grupo: 1, puntaje_S: 7 },
    "Universidad Nacional De Ingenieria": { region: "Lima", grupo: 1, puntaje_S: 9 },
    "Universidad Nacional Agraria La Molina": { region: "Lima", grupo: 1, puntaje_S: 7 },
    
    // GRUPO 2 (10 puntos clasificación)
    "Universidad Nacional Toribio Rodriguez De Mendoza De Amazonas": { region: "Amazonas", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional Tecnologica De Lima Sur": { region: "Lima", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Santiago Antunez De Mayolo": { region: "Ancash", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Micaela Bastidas De Apurimac": { region: "Apurímac", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Jose Maria Arguedas": { region: "Apurímac", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional Jose Faustino Sanchez Carrion": { region: "Lima", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Jorge Basadre Grohmann": { region: "Tacna", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional Intercultural Fabiola Salazar Leguia De Bagua": { region: "Amazonas", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Intercultural De Quillabamba": { region: "Cusco", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Intercultural De La Selva Central Juan Santos Atahualpa": { region: "Junín", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional Intercultural De La Amazonia": { region: "Ucayali", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Hermilio Valdizan": { region: "Huánuco", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional Federico Villarreal": { region: "Lima", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Del Santa": { region: "Ancash", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Del Callao": { region: "Callao", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Del Altiplano": { region: "Puno", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De Ucayali": { region: "Ucayali", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De Tumbes": { region: "Tumbes", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional De Trujillo": { region: "La Libertad", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De San Martin": { region: "San Martín", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional De San Cristobal De Huamanga": { region: "Ayacucho", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional De San Antonio Abad Del Cusco": { region: "Cusco", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De San Agustin De Arequipa": { region: "Arequipa", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De Piura": { region: "Piura", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional De Moquegua": { region: "Moquegua", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional De Juliaca": { region: "Puno", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional De Jaen": { region: "Cajamarca", grupo: 2, puntaje_S: 10 },
    "Universidad Nacional De Huancavelica": { region: "Huancavelica", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional De Frontera": { region: "Piura", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional De Educacion Enrique Guzman Y Valle": { region: "Lima", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional De Cañete": { region: "Lima", grupo: 2, puntaje_S: 9 },
    "Universidad Nacional De Cajamarca": { region: "Cajamarca", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional De Barranca": { region: "Lima", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Daniel Alcides Carrion": { region: "Pasco", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Autonoma De Tayacaja Daniel Hernandez Morillo": { region: "Huancavelica", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Autonoma De Huanta": { region: "Ayacucho", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Autonoma De Chota": { region: "Cajamarca", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Autonoma De Alto Amazonas": { region: "Loreto", grupo: 2, puntaje_S: 0 },
    "Universidad Nacional Autonoma Altoandina De Tarma": { region: "Junín", grupo: 2, puntaje_S: 7 },
    "Universidad Nacional Amazonica De Madre De Dios": { region: "Madre de Dios", grupo: 2, puntaje_S: 8 },
    "Universidad Nacional Agraria De La Selva": { region: "Huánuco", grupo: 2, puntaje_S: 0 },
    
    // GRUPO 3 (5 puntos clasificación)
    "Universidad Nacional San Luis Gonzaga De Ica": { region: "Ica", grupo: 3, puntaje_S: 0 },
    "Universidad Nacional Pedro Ruiz Gallo": { region: "Lambayeque", grupo: 3, puntaje_S: 8 },
    "Universidad Nacional Ciro Alegria": { region: "La Libertad", grupo: 3, puntaje_S: 7 }
};

// --- LOGIC FUNCTIONS ---

// Function 1: Custom Dropdown for Universities
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Custom University Dropdown
    const searchInput = document.getElementById('universidad-search');
    const hiddenInput = document.getElementById('universidad');
    const dropdown = document.getElementById('universidad-dropdown');
    
    if (searchInput && dropdown) {
        const uniKeys = Object.keys(universidadData).sort();
        
        // Populate dropdown
        function populateDropdown(filter = '') {
            dropdown.innerHTML = '';
            
            const filteredKeys = filter 
                ? uniKeys.filter(key => key.toLowerCase().includes(filter.toLowerCase()))
                : uniKeys;
            
            if (filteredKeys.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'custom-dropdown-no-results';
                noResults.textContent = '🔍 No se encontraron universidades';
                dropdown.appendChild(noResults);
            } else {
                filteredKeys.forEach((key, index) => {
                    const item = document.createElement('div');
                    item.className = 'custom-dropdown-item';
                    item.textContent = key;
                    item.setAttribute('data-value', key);
                    
                    // Add emoji icon based on group
                    const uniData = universidadData[key];
                    let icon = '🏛️';
                    if (uniData.grupo === 1) icon = '⭐';
                    else if (uniData.grupo === 3) icon = '📚';
                    
                    item.innerHTML = `${icon} ${key}`;
                    
                    item.addEventListener('click', () => {
                        searchInput.value = key;
                        hiddenInput.value = key;
                        dropdown.classList.remove('active');
                        
                        // Highlight selected
                        dropdown.querySelectorAll('.custom-dropdown-item').forEach(i => {
                            i.classList.remove('selected');
                        });
                        item.classList.add('selected');
                    });
                    
                    dropdown.appendChild(item);
                });
            }
        }
        
        // Show dropdown on focus
        searchInput.addEventListener('focus', () => {
            populateDropdown(searchInput.value);
            dropdown.classList.add('active');
        });
        
        // Filter on input
        searchInput.addEventListener('input', (e) => {
            populateDropdown(e.target.value);
            dropdown.classList.add('active');
            hiddenInput.value = ''; // Clear hidden value while typing
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Keyboard navigation
        let currentFocus = -1;
        
        searchInput.addEventListener('keydown', (e) => {
            const items = dropdown.querySelectorAll('.custom-dropdown-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentFocus++;
                if (currentFocus >= items.length) currentFocus = 0;
                setActive(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentFocus--;
                if (currentFocus < 0) currentFocus = items.length - 1;
                setActive(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentFocus > -1 && items[currentFocus]) {
                    items[currentFocus].click();
                }
            }
        });
        
        function setActive(items) {
            if (!items) return;
            removeActive(items);
            if (currentFocus >= items.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = items.length - 1;
            items[currentFocus].classList.add('selected');
            items[currentFocus].scrollIntoView({ block: 'nearest' });
        }
        
        function removeActive(items) {
            items.forEach(item => item.classList.remove('selected'));
        }
    }

    // 2. Dynamic Checkbox Limit based on available points
    const pobrezaCheckbox = document.getElementById('pobreza-extrema');
    const universidadSelect = document.getElementById('universidad');
    const checkboxes = document.querySelectorAll('input[name="otras"]');
    
    function updateCheckboxLimit() {
        // Validar que se haya seleccionado universidad primero
        const uniKey = universidadSelect.value.trim();
        
        if (!uniKey) {
            // Si no hay universidad seleccionada, deshabilitar checkboxes
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    cb.checked = false;
                }
            });
            return;
        }
        
        // Calcular puntos ya asignados
        const pobrezaPuntos = pobrezaCheckbox.checked ? 10 : 0;
        
        // Obtener tasa de interrupción regional
        let tasaInterrupcionPuntos = 0;
        if (universidadData[uniKey]) {
            const region = universidadData[uniKey].region;
            tasaInterrupcionPuntos = regionData[region] !== undefined ? regionData[region] : 0;
        }
        
        // Calcular puntos disponibles para "otras condiciones"
        const puntosUsados = pobrezaPuntos + tasaInterrupcionPuntos;
        const puntosDisponibles = 25 - puntosUsados;
        const maxOtrasCondiciones = Math.floor(puntosDisponibles / 5);
        
        // Verificar checkboxes ya marcados
        const checkedCount = document.querySelectorAll('input[name="otras"]:checked').length;
        if (checkedCount > maxOtrasCondiciones) {
            // Desmarcar los excedentes
            const checkedBoxes = document.querySelectorAll('input[name="otras"]:checked');
            for (let i = maxOtrasCondiciones; i < checkedBoxes.length; i++) {
                checkedBoxes[i].checked = false;
            }
            if (maxOtrasCondiciones === 0) {
                showNotification(
                    'Has alcanzado el máximo de 25 puntos en Condiciones Priorizables. No puedes seleccionar condiciones adicionales.', 
                    'info',
                    'Límite de puntos'
                );
            }
        }
        
        return maxOtrasCondiciones;
    }
    
    // Agregar validación al intentar marcar "Otras condiciones"
    checkboxes.forEach(cb => {
        cb.addEventListener('click', function(e) {
            const uniKey = universidadSelect.value.trim();
            
            // Validar que primero se haya seleccionado universidad
            if (!uniKey) {
                e.preventDefault();
                this.checked = false;
                showNotification(
                    'Primero debes seleccionar tu Universidad para poder calcular el puntaje disponible.', 
                    'error',
                    'Campo requerido'
                );
                return;
            }
            
            // Calcular límite actual
            const pobrezaPuntos = pobrezaCheckbox.checked ? 10 : 0;
            let tasaInterrupcionPuntos = 0;
            if (universidadData[uniKey]) {
                const region = universidadData[uniKey].region;
                tasaInterrupcionPuntos = regionData[region] !== undefined ? regionData[region] : 0;
            }
            
            const puntosUsados = pobrezaPuntos + tasaInterrupcionPuntos;
            const puntosDisponibles = 25 - puntosUsados;
            const maxOtrasCondiciones = Math.floor(puntosDisponibles / 5);
            
            // Verificar si se puede marcar
            if (this.checked) {
                const checkedCount = document.querySelectorAll('input[name="otras"]:checked').length;
                if (checkedCount > maxOtrasCondiciones) {
                    e.preventDefault();
                    this.checked = false;
                    showNotification(
                        `Solo puedes seleccionar ${maxOtrasCondiciones} condiciones adicionales (puntos disponibles: ${puntosDisponibles} de 25).`, 
                        'warning',
                        'Límite alcanzado'
                    );
                }
            }
        });
    });
    
    // Actualizar límite cuando cambie pobreza extrema o universidad
    pobrezaCheckbox.addEventListener('change', updateCheckboxLimit);
    universidadSelect.addEventListener('change', updateCheckboxLimit);
    
    // Inicializar límite
    updateCheckboxLimit();
});

// Function 2: Main Score Calculation
function calculateScore() {
    // --- 1. GET INPUTS ---
    const uniKey = document.getElementById('universidad').value.trim();
    const rendimientoValue = document.getElementById('rendimiento').value;
    
    if (!uniKey || !rendimientoValue) {
        showNotification('Por favor, selecciona tu Universidad y tu Rendimiento Académico.', 'error', 'Campos requeridos');
        return;
    }

    // Verificar que la universidad existe en la base de datos
    if (!universidadData[uniKey]) {
        showNotification('Por favor, selecciona una universidad válida de la lista.', 'error', 'Universidad no válida');
        return;
    }

    const isPobrezaExtrema = document.getElementById('pobreza-extrema').checked;
    const otrasCondicionesChecked = document.querySelectorAll('input[name="otras"]:checked');
    
    // --- 2. GET DATA FROM DATABASE ---
    const uniData = universidadData[uniKey];
    
    // Handle Lima y Callao region consolidation
    let region = uniData.region;
    if (region === "Lima" || region === "Callao") {
        region = "Lima y Callao";
    }

    // Calcular puntaje P según el grupo
    let puntajeP = 10; // Por defecto Grupo 2
    if (uniData.grupo === 1) {
        puntajeP = 15;
    } else if (uniData.grupo === 3) {
        puntajeP = 5;
    }
    
    const puntajeS = uniData.puntaje_S;
    const puntajeTasaInterrupcion = regionData[region] !== undefined ? regionData[region] : 0;

    // --- 3. CALCULATE SCORES (Based on rules) ---

    // A: Perfil Académico (Max 50 pts)
    const puntajeA = parseInt(rendimientoValue);

    // B: Características IES (Max 25 pts)
    // Formula: (P + S) capped at 25
    const puntajeB_raw = puntajeP + puntajeS;
    const puntajeB = Math.min(puntajeB_raw, 25);

    // C: Condiciones Priorizables (Max 25 pts)
    // Formula: (Pobreza Extrema + Tasa Interrupción + Otras) capped at 25
    const puntajePobreza = isPobrezaExtrema ? 10 : 0;
    const puntajeOtras = otrasCondicionesChecked.length * 5;
    
    const puntajeC_raw = puntajePobreza + puntajeTasaInterrupcion + puntajeOtras;
    const puntajeC = Math.min(puntajeC_raw, 25);

    // D: Total Score
    const totalScore = puntajeA + puntajeB + puntajeC;

    // --- 4. DISPLAY RESULTS ---
    
    // Main Scores
    document.getElementById('score-a').textContent = `${puntajeA} pts`;
    document.getElementById('score-b').textContent = `${puntajeB} pts`;
    document.getElementById('score-c').textContent = `${puntajeC} pts`;
    
    // Total
    document.getElementById('total-score').textContent = totalScore;
    
    // Details - Mostrar el grupo de priorización
    const grupoTexto = uniData.grupo === 1 ? "Grupo 1" : uniData.grupo === 2 ? "Grupo 2" : "Grupo 3";
    document.getElementById('detail-b').innerHTML = `${grupoTexto}: Clasificación (P): ${puntajeP} pts<br>Selectividad (S): ${puntajeS} pts<br><strong>Subtotal B: ${puntajeB_raw} pts${puntajeB_raw > 25 ? ' → <span style="color: var(--primary-color);">Limitado a 25 pts</span>' : ''}</strong>`;
    
    let detailC = `P. Extrema: ${puntajePobreza} pts<br>Tasa Regional (${region}): ${puntajeTasaInterrupcion} pts<br>Otras: ${puntajeOtras} pts<br><strong>Subtotal C: ${puntajeC_raw} pts`;
    if (puntajeC_raw > 25) {
        detailC += ` → <span style="color: var(--primary-color);">Limitado a 25 pts</span>`;
    }
    detailC += '</strong>';
    document.getElementById('detail-c').innerHTML = detailC;

    // Show the results container with smooth scroll
    const resultsElement = document.getElementById('results');
    resultsElement.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}
