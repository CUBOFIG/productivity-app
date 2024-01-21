# Productivity App

Prueba tecnica para vacante FrontEnd Developer en Arkon data.

Desarrollada con React + Redux + Vite.

Puedes consultar la app en la ruta: [DEPLOY](https://shiny-salmiakki-87dea8.netlify.app/)

## Problema propuesto:

Desarrollar una aplicación de productividad en la que los usuarios puedan gestionar y filtrar una lista de
tareas, así como registrar el tiempo que les toma ejecutarlas. Para esto existe un temporizador, el cual
se inicializa con la duración de la tarea en cuestión y cuenta hacia cero, desplegando en todo momento
el tiempo restante. El usuario puede ver un histórico de las tareas que ha completado, así como una
gráfica que represente su productividad en la última semana.

### ¿Por qué utilizar Vite?

- Rápida Puesta en Marcha.
- Rendimiento en Desarrollo.
- Construcción Optimizada.

## Descarga del proyecto:

La descarga del codigo fuente se puede realizar utilizando una clonación mediante ssh:

```bash
git clone git@github.com:CUBOFIG/productivity-app.git
```

O mediante https:

```bash
git clone https://github.com/CUBOFIG/productivity-app.git
```

Una vez con el proyecto, abrir una linea de comandos y pocisionarse dentro de la carpeta del proyecto para iniciar el proyecto.

## Iniciar proyecto:

- npm install
- npm run dev

## Versión de Node

- Se construyó en la versión v18.17.0

# Casos de Uso

Se realizaron diversas pruebas para verificar el funcionamiento de la tarea. A continuación, se describen los casos de uso probados:

## Casos de Uso Probados

1. **Creación de una Tarea con Tiempo Específico:** Crear una tarea asignándole un tiempo específico.
2. **Creación de una Tarea con Tiempo Definido de Forma Manual:** Establecer manualmente el tiempo de duración de una tarea.
3. **Iniciar el Temporizador (Timer):** Iniciar el temporizador para una tarea.
4. **Pausar el Temporizador y Verificar Tiempo Restante:** Pausar el temporizador y comprobar la visualización correcta del tiempo restante.
5. **Editar la Tarea en Curso:** Realizar una edición en la tarea que está en curso.
6. **Editar una Tarea en el Listado:** Editar una tarea que se encuentra en la lista.
7. **Completar una Tarea Principal y Verificar su Registro en el Historial:** Completar la tarea situada en la cabecera y verificar su aparición en el historial.
8. **Completar una Tarea del Listado y Verificar su Registro en el Historial:** Completar una tarea de la lista y comprobar su registro en el historial.
9. **Eliminar una Tarea en el Listado:** Eliminar una tarea de la lista.
10. **Eliminar una Tarea Principal:** Eliminar la tarea principal.
11. **Validar el Temporizador en Diferentes Vistas:** Comprobar el funcionamiento del temporizador en distintas vistas de la aplicación.
12. **Validar el Ordenamiento de los Datos:** Verificar el correcto ordenamiento de los datos en la aplicación.

## Flujos Más Concretos

- **Creación de un Total de 5 Tareas:** Con el objetivo de tener datos suficientes para realizar pruebas.
- **Mover la Tarea Principal un Total de 6 Veces entre las Diferentes Tareas del Listado:** Para probar la persistencia de los datos durante los cambios.
- **Iniciar la Tarea Principal y Navegar entre Diferentes Secciones:** Iniciar la tarea principal, moverse al Dashboard, al Historial, y recargar la página para validar que el temporizador se visualiza correctamente.
- **Regresar a la Página Inicial y Validar que el Temporizador se Detuvo:** Comprobar que, al volver a la página inicial, el temporizador se ha detenido.
- **Completar la Tarea y Verificar su Registro:** Finalizar la tarea en curso y asegurarse de que se registra adecuadamente.

Estas pruebas ayudan a asegurar la robustez y fiabilidad de la aplicación en diferentes escenarios de uso.

## Autor.

- Heriberto Figueroa Michel
