# Challenge Eldar

El proyecto es una aplicación web de gestión de posts con funcionalidad de inicio de sesión. Los usuarios, dependiendo de su rol, tendrán diferentes niveles de acceso. Un usuario estándar podrá visualizar y buscar posts, mientras que un administrador, además de estas funciones, tendrá la capacidad de editar y crear nuevos posts.

## Ejecucion local
En la terminal ejecutar `npm i` y luego `ng serve`

## Tecnologias utilizadas

- Angular 18.1.0
- Angular/fire 18.0.1
- PrimeNG 17.18.8
- PrimeFlex 3.3.1
- PrimeIcons 7.0.0

Utilice Angular para desarrollar la interfaz de usuario, Firebase para la autenticacion y PrimeNG para los estilos de la aplicacion y sus componentes.

## Estructura del proyecto

![image](https://github.com/user-attachments/assets/d67edd6e-0c14-469a-b2f6-6f9363af6fb8)


## Descripción de Carpetas y Archivos
- components/: Contiene los componentes reutilizables de la aplicación.
  - card-post/: Componente que muestra una tarjeta de post.
  - toolbar/: Componente de navegacion, logout.

- guards/: Contiene las guardias de rutas que controlan el acceso basado en autenticación y roles.
  - auth.guard.ts: Guardia que protege rutas que requieren autenticación.
  - role.guard.ts: Guardia que protege rutas basadas en roles de usuario.

- interfaces/: Define las interfaces TypeScript utilizadas en la aplicación.
  - post.ts: Interfaz para la estructura de un post.
  - user.ts: Interfaz para la estructura de un usuario.

- pages/: Contiene las diferentes páginas de la aplicación.
  - home/: Página principal de la aplicación.
  - login/: Página de inicio de sesión.
  - new-post/: Página para crear o editar un post.
  
- services/: Contiene los servicios que manejan la lógica de negocio.
  - api-manager/: Servicio que gestiona las llamadas a la API externa.
  - auth/: Servicio de autenticación.
  - post/: Servicio que maneja la lógica relacionada con los posts.
  - user-manager/: Servicio que gestiona la información del usuario y sus roles.

- app.routes.ts: Configuración de rutas de la aplicación.

- environments/: Contiene las configuraciones de entorno para desarrollo y producción.

##Pruebas al aplicativo

Con los siguientes usuarios podran Iniciar sesion en el aplicativo y  realizar las respectivas tareas dependendiendo del usuario que escojan. 

usuario Admin:
  -email: admin@admin.com
  -password: 67891011
usuario User(simple):
  -email: user@user.com
  -password: 123456







