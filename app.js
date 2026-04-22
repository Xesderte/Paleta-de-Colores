// Seleccionar elementos
const boton = document.getElementById("generarBtn");
const contenedor = document.getElementById("contenedor");

// Función para generar color HSL aleatorio
function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = 70;
    const l = 60;

    colorHsl =`hsl(${h}, ${s}%, ${l}%)`;

    return {colorHsl, h, s, l };
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

// Evento click
boton.addEventListener("click", () => {
    console.log("Click detectado");

    // Limpiar contenedor
    contenedor.innerHTML = "";

    // Generar 3 colores (fase 1)
    for (let i = 0; i < 3; i++) {

        const {colorHsl, h, s, l} = generarColorHSL();
        console.log(colorHsl);

        // Crear elemento
        const caja = document.createElement("div");
        caja.classList.add("color");

        // Aplicar color
        caja.style.backgroundColor = colorHsl;

        //Pasar de HSL a Hexadecimal
        const colorHex = hslToHex(h, s, l);
        
        // Mostrar texto
        caja.textContent = colorHex;

        // Agregar al DOM
        contenedor.appendChild(caja);
    }
});