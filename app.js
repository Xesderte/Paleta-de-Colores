let cantidadMax = null;

const boton = document.getElementById("generarBtn");
const btnGuardar = document.getElementById("guardarBtn");
const contenedor = document.getElementById("contenedor");
const botonesCantidad = document.querySelectorAll(".cantidad");
const formatSelectors = document.querySelectorAll('input[name="formato"]');
const toastContainer = document.getElementById("toast-container");
const mensaje = document.getElementById("mensaje");

// Nuevos elementos del historial
const listaPaletas = document.getElementById("lista-paletas");
const btnBorrarHistorial = document.getElementById("borrarHistorial");

// --- LÓGICA DE CONVERSIÓN Y FORMATO ---

function obtenerFormatoActivo() {
    return document.querySelector('input[name="formato"]:checked').value;
}

function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function rgbToHex(r, g, b) {
    const toHex = x => x.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function generarTextoColor(h, s, l, formato) {
    const [r, g, b] = hslToRgb(h, s, l);
    if (formato === "hex") return rgbToHex(r, g, b);
    if (formato === "rgba") return `rgba(${r}, ${g}, ${b}, 1)`;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// --- GENERACIÓN DE COLORES ---

function crearDatosColor() {
    return {
        h: Math.floor(Math.random() * 360),
        s: 70,
        l: 60
    };
}

function aplicarColorACaja(caja, h, s, l) {
    const formato = obtenerFormatoActivo();
    caja.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    caja.textContent = generarTextoColor(h, s, l, formato);
    
    caja.dataset.h = h;
    caja.dataset.s = s;
    caja.dataset.l = l;
}

// --- EVENTOS ---

formatSelectors.forEach(radio => {
    radio.addEventListener("change", () => {
        const cajas = contenedor.querySelectorAll(".color");
        const nuevoFormato = obtenerFormatoActivo();
        
        cajas.forEach(caja => {
            const h = parseInt(caja.dataset.h);
            const s = parseInt(caja.dataset.s);
            const l = parseInt(caja.dataset.l);
            caja.textContent = generarTextoColor(h, s, l, nuevoFormato);
        });
    });
});

boton.addEventListener("click", () => {
    if (cantidadMax === null) {
        mensaje.style.display = "inline-block";
        mensaje.textContent = "⚠️ Seleccionar cantidad ⚠️";
        return;
    }
    mensaje.style.display = "none";
    
    let cajasArray = Array.from(contenedor.querySelectorAll(".color"));

    let aEliminar = cajasArray.length - cantidadMax;
    if (aEliminar > 0) {
        for (let i = cajasArray.length - 1; i >= 0 && aEliminar > 0; i--) {
            if (!cajasArray[i].classList.contains("bloqueado")) {
                cajasArray[i].remove();
                cajasArray.splice(i, 1);
                aEliminar--;
            }
        }
        for (let i = cajasArray.length - 1; i >= 0 && aEliminar > 0; i--) {
            cajasArray[i].remove();
            cajasArray.splice(i, 1);
            aEliminar--;
        }
    }

    cajasArray.forEach((caja) => {
        if (caja.classList.contains("bloqueado")) return;
        const { h, s, l } = crearDatosColor();
        aplicarColorACaja(caja, h, s, l);
    });

    if (cajasArray.length < cantidadMax) {
        for (let i = cajasArray.length; i < cantidadMax; i++) {
            const caja = document.createElement("div");
            caja.classList.add("color");
            caja.addEventListener("click", () => caja.classList.toggle("bloqueado"));
            
            const { h, s, l } = crearDatosColor();
            aplicarColorACaja(caja, h, s, l);
            contenedor.appendChild(caja);
        }
    }
});

botonesCantidad.forEach((btn) => {
    btn.addEventListener("click", () => {
        cantidadMax = parseInt(btn.dataset.cantidad);
        botonesCantidad.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        mensaje.style.display = "none";
    });
});

// --- SISTEMA DE HISTORIAL Y LOCAL STORAGE ---

function mostrarToast(texto, tipo = "exito") {
    const toast = document.createElement("div");
    toast.classList.add("toast", tipo);
    toast.innerHTML = (tipo === "exito" ? "✅ " : "⚠️ ") + texto;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0'; 
        setTimeout(() => toast.remove(), 300); 
    }, 3000);
}

function renderizarHistorial() {
    listaPaletas.innerHTML = "";
    const historial = JSON.parse(localStorage.getItem("misPaletas")) || [];

    historial.forEach((data, index) => {
        // Validación de seguridad para evitar errores con paletas antiguas
        if(!data.colores) return; 

        const item = document.createElement("div");
        item.classList.add("item-paleta");
        
        // Creamos la tirita de colores y el texto
        item.innerHTML = `
            <span>Paleta ${historial.length - index} (${data.formato.toUpperCase()})</span>
            <div class="previsualizacion-colores">
                ${data.colores.map(c => `<div class="mini-color" style="background:${c.bg}"></div>`).join('')}
            </div>
        `;

        item.addEventListener("click", () => cargarPaletaEnGenerador(data));
        listaPaletas.appendChild(item);
    });
}

function cargarPaletaEnGenerador(data) {
    // 1. Ajustar la cantidad
    cantidadMax = data.colores.length;
    botonesCantidad.forEach(btn => {
        if(parseInt(btn.dataset.cantidad) === cantidadMax) btn.classList.add("activo");
        else btn.classList.remove("activo");
    });

    // 2. Ajustar el radio button del formato para que coincida con el guardado
    formatSelectors.forEach(radio => {
        if(radio.value === data.formato) radio.checked = true;
    });

    // 3. Recrear las cajas con la información guardada
    contenedor.innerHTML = "";
    data.colores.forEach(colorData => {
        const caja = document.createElement("div");
        caja.classList.add("color");
        caja.style.backgroundColor = colorData.bg;
        
        // Restauramos los valores internos para que los botones de formato sigan funcionando
        caja.dataset.h = colorData.h;
        caja.dataset.s = colorData.s;
        caja.dataset.l = colorData.l;
        
        caja.textContent = generarTextoColor(colorData.h, colorData.s, colorData.l, data.formato);

        caja.addEventListener("click", () => caja.classList.toggle("bloqueado"));
        contenedor.appendChild(caja);
    });

    mostrarToast("Paleta cargada al área principal");
}

btnGuardar.addEventListener("click", () => {
    const cajas = contenedor.querySelectorAll(".color");
    if (cajas.length === 0) {
        mostrarToast("Debes generar colores primero", "error");
        return;
    }

    // Guardamos la estructura completa: formato, fondo y las coordenadas HSL
    const coloresData = Array.from(cajas).map(caja => ({
        h: parseInt(caja.dataset.h),
        s: parseInt(caja.dataset.s),
        l: parseInt(caja.dataset.l),
        bg: caja.style.backgroundColor
    }));

    const formatoActual = obtenerFormatoActivo();

    const nuevaEntrada = {
        colores: coloresData,
        formato: formatoActual
    };

    const historial = JSON.parse(localStorage.getItem("misPaletas")) || [];
    historial.unshift(nuevaEntrada);
    localStorage.setItem("misPaletas", JSON.stringify(historial));
    
    renderizarHistorial();
    mostrarToast("Se guardó en el local storage la paleta");
});

btnBorrarHistorial.addEventListener("click", () => {
    localStorage.removeItem("misPaletas");
    renderizarHistorial();
    mostrarToast("Historial borrado");
});

// Cargar la lista apenas se abre la página
renderizarHistorial();