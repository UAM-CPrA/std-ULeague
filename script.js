document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to std::ULeague!');
});

// Crear el cursor personalizado
const cursor = document.createElement('div');
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.position = 'absolute';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '1000';
cursor.style.backgroundColor = 'white'; // Centro del cursor

// Crear un anillo exterior para el cursor
const cursorRing = document.createElement('div');
cursorRing.style.width = '40px';
cursorRing.style.height = '40px';
cursorRing.style.borderRadius = '50%';
cursorRing.style.position = 'absolute';
cursorRing.style.pointerEvents = 'none';
cursorRing.style.border = '2px solid orange'; // Anillo naranja
cursorRing.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)'; // Sombra negra
cursorRing.style.zIndex = '999';

// Agregar los elementos al cuerpo
document.body.appendChild(cursorRing);
document.body.appendChild(cursor);

// Esconder el cursor original
document.body.style.cursor = 'none';

// Actualizar la posición del cursor personalizado
document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    cursorRing.style.left = e.pageX - 10 + 'px'; // Centrar el anillo
    cursorRing.style.top = e.pageY - 10 + 'px'; // Centrar el anillo
});

// Cambiar el estilo del cursor personalizado al interactuar con elementos clicables
const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        cursor.style.backgroundColor = 'orange'; // Cambiar el centro a naranja
        cursorRing.style.border = '2px solid white'; // Cambiar el anillo a blanco
    });
    element.addEventListener('mouseleave', function () {
        cursor.style.backgroundColor = 'white'; // Volver al color original
        cursorRing.style.border = '2px solid orange'; // Volver al color original
    });
});
