# 🎨 Generador de Paletas Pro - Proyecto M1

Bienvenido al **Generador de Paletas de Colores Pro**. Esta aplicación web interactiva ha sido desarrollada como práctica profesional de ingeniería de software. Su objetivo es brindar a los usuarios una herramienta robusta para generar, gestionar y persistir paletas cromáticas utilizando estándares web modernos.

---

## ✨ Características Principales

- **Generación Armónica:** Creación algorítmica de colores basada en el modelo HSL.
- **Smart Lock (Bloqueo Inteligente):** Permite fijar colores específicos. El algoritmo de redimensionamiento respeta los bloqueos, gestionando dinámicamente la matriz de colores.
- **Conversión en Tiempo Real (On-the-fly):** Selector dinámico para traducir la paleta entre formatos numéricos (`HEX`, `RGBA`, `HSL`) sin necesidad de recargar los elementos del DOM.
- **Historial Persistente:** Panel lateral que almacena el estado completo de las paletas en el `LocalStorage` del navegador, incluyendo metadatos de formato original.
- **Recuperación de Estado:** Capacidad de inyectar paletas del historial de vuelta al área de trabajo para su edición.
- **Diseño Responsivo:** Adaptación de layout (PC a Móvil) empleando CSS Grid y Flexbox.

---

## 🛠️ Stack Tecnológico

- **HTML5:** Estructura semántica.
- **CSS3:** Grid, Flexbox, Media Queries y animaciones personalizadas (keyframes).
- **JavaScript (Vanilla):** Lógica funcional (ES6+), manipulación del DOM y manejo asíncrono.
- **APIs Web:** `LocalStorage API` para persistencia de datos del lado del cliente.
- **Herramientas de Diseño:** Photopea para edición de canal alfa en assets (Favicon).

---

## ⚙️ Decisiones Técnicas (Manual Técnico)

El código fuente ha sido estructurado considerando buenas prácticas de desarrollo:

1. **Gestión de Datos mediante `dataset`:** Para evitar la pérdida de información matemática al convertir un color a texto (ej. HEX a HSL), cada nodo HTML (`div.color`) almacena sus coordenadas originales en atributos `data-h`, `data-s` y `data-l`. Las funciones de conversión leen esta "memoria interna" en lugar del texto renderizado.
   
2. **Algoritmo de Eliminación Inteligente (Doble Pasada):**
   Al reducir la cantidad de colores mostrados (ej. de 9 a 6), el algoritmo ejecuta una doble validación:
   * **Fase 1:** Recorre el arreglo de atrás hacia adelante eliminando exclusivamente nodos desbloqueados.
   * **Fase 2:** Si la cuota de reducción no se cumple (por exceso de elementos bloqueados), procede a eliminar nodos excedentes para respetar la cuadrícula estructural.

3. **Arquitectura de Feedback (Toasts):**
   Implementación de un sistema de notificaciones no bloqueantes con inyección dinámica en el DOM y ciclo de vida controlado por `setTimeout`.

---

## 📖 Manual de Usuario

1. **Seleccionar Cantidad:** Elige generar 6, 8 o 9 colores desde el panel superior.
2. **Generar:** Presiona `GENERAR PALETA` para poblar el área de trabajo.
3. **Bloquear:** Haz clic en cualquier color para anclarlo (`🔒`). Los colores anclados no cambiarán en futuras generaciones.
4. **Cambiar Formato:** Alterna entre `HEX`, `HSL` o `RGBA` usando los selectores superiores.
5. **Guardar:** Presiona `GUARDAR PALETA` para enviar la composición a tu bitácora lateral.
6. **Restaurar:** Haz clic sobre cualquier paleta del Historial para cargarla nuevamente en el generador principal.

---

## 🚀 Instalación y Despliegue

### 💻 Ejecución Local
Al ser un proyecto *Zero-dependency* (sin frameworks externos), su ejecución es inmediata:
1. Clona este repositorio:
   ```bash
   git clone [https://github.com/Xesderte/ProyectoM1_Paleta-de-Colores.Daniel-Sardinas.git].git

## 🔗 Limk de Drive 🌐
   1. Link: https://drive.google.com/drive/folders/1N7DwmKC9Y00QHGEVrQgd0BmF5Pj_mBzi?usp=drive_link

