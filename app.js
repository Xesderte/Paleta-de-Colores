let cantidadMax = null;
let mitad = null;

const boton = document.getElementById("generarBtn");
const btnGuardar = document.getElementById("guardarBtn");
const contenedor = document.getElementById("contenedor");
const botonesCantidad = document.querySelectorAll(".cantidad");
const mensaje = document.getElementById("mensaje");
const toastContainer = document.getElementById("toast-container");

function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    return { colorHsl: `hsl(${h}, 70%, 60%)`, h, s: 70, l: 60 };
}

function generarColorHex() {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += letras[Math.floor(Math.random() * 16)];
    return color;
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => Math.round(255 * x).toString(16).padStart(2, "0");
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

boton.addEventListener("click", () => {
    if (cantidadMax === null) {
        mensaje.style.display = "inline-block";
        mensaje.textContent = "⚠️ Seleccionar la cantidad a generar ⚠️";
        return;
    }
    mensaje.style.display = "none";
    const cajas = contenedor.querySelectorAll(".color");

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
    });

    if (cajas.length < cantidadMax) {
        for (let i = cajas.length; i < cantidadMax; i++) {
            const caja = document.createElement("div");
            caja.classList.add("color");
            caja.addEventListener("click", () => caja.classList.toggle("bloqueado"));
            if (i < mitad) {
                const { colorHsl, h, s, l } = generarColorHSL();
                caja.style.backgroundColor = colorHsl;
                caja.textContent = hslToHex(h, s, l);
            } else {
                const colorHex = generarColorHex();
                caja.style.backgroundColor = colorHex;
                caja.textContent = colorHex;
            }
            contenedor.appendChild(caja);
        }
    }

    if (cajas.length > cantidadMax) {
        for (let i = cajas.length - 1; i >= cantidadMax; i--) cajas[i].remove();
    }
});

botonesCantidad.forEach((btn) => {
    btn.addEventListener("click", () => {
        cantidadMax = parseInt(btn.dataset.cantidad);
        mitad = Math.floor(cantidadMax / 2) + (cantidadMax % 2);
        botonesCantidad.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        mensaje.style.display = "none";
    });
});

// --- EL CÓDIGO DE GUARDAR Y NOTIFICAR QUE PEDISTE ---

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

btnGuardar.addEventListener("click", () => {
    const cajas = contenedor.querySelectorAll(".color");
    const paletaNueva = Array.from(cajas).map(caja => caja.textContent);
    
    if (paletaNueva.length === 0) {
        mostrarToast("Debes generar colores primero", "error");
        return;
    }

    const paletasGuardadas = JSON.parse(localStorage.getItem("misPaletas")) || [];
    paletasGuardadas.unshift(paletaNueva);
    localStorage.setItem("misPaletas", JSON.stringify(paletasGuardadas));
    
    // EL MENSAJE EXACTO QUE PEDISTE
    mostrarToast("Se guardó en el local storage la paleta");
});