//Variables globales
let cantidadMax = null;
let mitad = null;

// Seleccionar elementos
const boton = document.getElementById("generarBtn");
const contenedor = document.getElementById("contenedor");
const cantidadColores = document.getElementById("cantidad");
const botonesCantidad = document.querySelectorAll(".cantidad");
const mensaje = document.getElementById("mensaje");

// Función para generar color HSL aleatorio
function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = 70;
    const l = 60;

    colorHsl =`hsl(${h}, ${s}%, ${l}%)`;

    return {colorHsl, h, s, l };
}

// Función para generar color hexadecimal aleatorio
function generarColorHex() {
    const letras = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 16);
        color += letras[random];
    }

    return color;
}

//Funcion para convertir HSL a Hexadecimal
function hslToHex(h, s, l) {
    // Convertir a RGB primero
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));

    // Convertir a HEX
    const toHex = x => x.toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}


// Evento click Generar colores
boton.addEventListener("click", () => {
    
    if (cantidadMax === null) {
        mensaje.style.display = "inline-block";
        mensaje.textContent = "⚠️ Seleccionar la cantidad a generar ⚠️";
        return;
    }

    mensaje.style.display = "none";

    const cajas = contenedor.querySelectorAll(".color");

    // 🔥 1. ACTUALIZAR LAS EXISTENTES
    cajas.forEach((caja, index) => {

        if (caja.classList.contains("bloqueado")) return;

        if (index < mitad) {
            const { colorHsl, h, s, l } = generarColorHSL();
            caja.style.backgroundColor = colorHsl;
            caja.textContent = hslToHex(h, s, l);
        } else {
            const colorHex = generarColorHex();
            caja.style.backgroundColor = colorHex;
            caja.textContent = colorHex;
        }
        console.log("actualizando caja", index);
    });

    // 🔥 2. SI FALTAN CAJAS → CREAR
    if (cajas.length < cantidadMax) {

        for (let i = cajas.length; i < cantidadMax; i++) {

            const caja = document.createElement("div");
            caja.classList.add("color");

            caja.addEventListener("click", () => {
                caja.classList.toggle("bloqueado");
            });

            if (i < mitad) {
                const { colorHsl, h, s, l } = generarColorHSL();
                caja.style.backgroundColor = colorHsl;
                caja.textContent = hslToHex(h, s, l);
                console.log("creando caja", i,"--", colorHsl);
            } else {
                const colorHex = generarColorHex();
                caja.style.backgroundColor = colorHex;
                caja.textContent = colorHex;
                console.log("creando caja", i,"--", colorHex);
            }

            contenedor.appendChild(caja);
        }
    }

    // 🔥 3. SI SOBRAN CAJAS → ELIMINAR
    if (cajas.length > cantidadMax) {
        for (let i = cajas.length - 1; i >= cantidadMax; i--) {
            console.log("eliminando caja", i);
            cajas[i].remove();
        }
    }
});


// Evento click para botones de cantidad
botonesCantidad.forEach((btn) => {
    btn.addEventListener("click", () => {

        cantidadMax = parseInt(btn.dataset.cantidad);
        mitad = Math.floor(cantidadMax / 2) + (cantidadMax % 2); // Si es impar, agregar uno más a la mitad

        console.log("Cantidad seleccionada:", cantidadMax);
        console.log("Mitad de la cantidad:", mitad);

        // 1. Sacar activo de todos
        botonesCantidad.forEach(b => b.classList.remove("activo"));

        // 2. Agregar activo al clickeado
        btn.classList.add("activo");

        mensaje.style.display = "none";
    });
});

// --- FUNCIONES DE GUARDADO Y MICROFEEDBACK ---

function obtenerPaletaActual() {
    const cajas = contenedor.querySelectorAll(".color");
    return Array.from(cajas).map(caja => caja.textContent);
}

function mostrarToast(texto, tipo = "exito") {
    const toast = document.createElement("div");
    toast.classList.add("toast", tipo);
    toast.textContent = texto;
    toastContainer.appendChild(toast);

    // Eliminar el toast automáticamente después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0'; 
        setTimeout(() => toast.remove(), 300); 
    }, 3000);
}

btnGuardar.addEventListener("click", () => {
    const paletaNueva = obtenerPaletaActual();
    
    if (paletaNueva.length === 0) {
        mostrarToast("⚠️ Debes generar colores primero", "error");
        return;
    }

    const paletasGuardadas = JSON.parse(localStorage.getItem("misPaletas")) || [];
    paletasGuardadas.unshift(paletaNueva);
    localStorage.setItem("misPaletas", JSON.stringify(paletasGuardadas));
    
    mostrarToast("¡Paleta guardada exitosamente!");
});