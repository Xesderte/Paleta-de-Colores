# Generador de Paletas de Colores - Proyecto M1

Este es un generador interactivo de paletas de colores desarrollado con HTML, CSS y JavaScript Vanilla. Permite a los usuarios crear combinaciones de colores aleatorias, bloquear sus colores favoritos y guardar sus paletas en el navegador.

## 📖 Manual de Usuario (Instrucciones de Uso)

1. **Seleccionar cantidad:** Al ingresar a la aplicación, elige cuántos colores deseas en tu paleta presionando los botones **6**, **8** o **9**.
2. **Generar colores:** Haz clic en el botón **GENERAR**. La aplicación creará una paleta mixta (colores vibrantes en formato HSL y colores aleatorios en HEX).
3. **Bloquear colores (Lock):** Si te gusta un color en particular, haz clic sobre esa caja. Aparecerá un candado (🔒) indicando que el color está bloqueado. Al volver a presionar "GENERAR", los colores bloqueados se mantendrán y solo cambiarán los demás.
4. **Guardar Paleta:** Cuando tengas una combinación que te guste, presiona **GUARDAR PALETA**. Un mensaje de éxito confirmará que la paleta se ha guardado en el historial de tu navegador.

## ⚙️ Manual Técnico (Decisiones Técnicas)

El proyecto fue construido siguiendo buenas prácticas de desarrollo y accesibilidad:

* **Estructura y Semántica (HTML):** Se utilizaron etiquetas semánticas (`<header>`, `<main>`) y se incorporaron atributos de accesibilidad como `aria-label` en los botones y `aria-live="polite"` en el contenedor dinámico para mejorar la experiencia con lectores de pantalla.
* **Diseño y Layout (CSS):** * Se implementó **CSS Grid** (`grid-template-columns: repeat(auto-fit, minmax(...))`) para el contenedor principal de colores, logrando un diseño completamente fluido y adaptable sin necesidad de múltiples media queries.
  * Para asegurar la legibilidad del código hexadecimal sobre cualquier color de fondo, se aplicó la propiedad `text-shadow` garantizando un alto contraste.
  * Se diseñó un sistema de notificaciones no intrusivas (Toasts) con animaciones CSS (`@keyframes`) para el microfeedback.
* **Lógica y Rendimiento (JavaScript):**
  * **Optimización del DOM:** Al generar nuevas paletas, el algoritmo actualiza los nodos existentes en lugar de vaciar y recrear todo el contenedor desde cero, mejorando el rendimiento.
  * **Generación Mixta:** Para asegurar paletas estéticamente agradables, la mitad de los colores se generan utilizando el modelo HSL (con saturación y luminosidad controladas) y la otra mitad en Hexadecimal puro.
  * **Persistencia de Datos:** Se implementó `localStorage` con serialización JSON (`JSON.stringify` / `JSON.parse`) para guardar el estado de las paletas en el cliente de forma persistente.

## 🚀 Instalación y Ejecución Local

Para descargar y probar este proyecto en tu propia computadora, sigue estos pasos:

1. Abre tu terminal o consola de comandos.
2. Clona este repositorio utilizando Git:
   ```bash
   git clone [https://github.com/](https://github.com/)[TuUsuarioGithub]/ProyectoM1_[Tu_Nombre].git