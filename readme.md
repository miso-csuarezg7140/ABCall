# ABCall - Sistema de Gestión de Incidencias para Pequeñas y Medianas Empresas

## Descripción

**ABCall** es una plataforma dedicada a la tercerización de servicios de atención al cliente, diseñada específicamente para pequeñas y medianas empresas. El sistema permite gestionar llamadas de entrada y salida, registrar incidentes (PQRs), y automatizar procesos de escalamiento, utilizando tecnologías de analítica predictiva e inteligencia artificial.

La aplicación está diseñada tanto para web como para móvil y ofrece diferentes planes para las empresas, incluyendo funcionalidades como:
- Registro de clientes y selección de plan (Emprendedor, Empresario, Empresario Plus).
- Registro y consulta de incidentes a través de múltiples canales: web, móvil, telefónico, y correo electrónico.
- Gestión de incidentes por parte de administradores y agentes de soporte.
- Tableros de control e indicadores con estadísticas en tiempo real.
- Servicios de IA generativa y analítica predictiva para la resolución de incidentes.

## Tecnologías Utilizadas

El proyecto ABCall está desarrollado usando las siguientes tecnologías:

### Backend:
- **Python 3.8+**
- **Flask** (Framework web)
- **SQLAlchemy** (ORM)
- **PostgreSQL** (Base de datos)
- **JWT** (Autenticación)
- **psycopg2-binary** (Conector de PostgreSQL)

### Frontend:
- **Angular** (Framework para la aplicación web)
- **Kotlin** (Para la aplicación móvil)

### Infraestructura y despliegue:
- **Google Cloud Platform** (Despliegue de infraestructura)
- **Docker** (Contenedores)
- **Kubernetes** (Orquestación de contenedores)

### Plugins y Herramientas:
- **Figma** (Prototipado visual)
- **pgAdmin4** (Administración de la base de datos PostgreSQL)

## Características Principales

- **Registro de incidentes y consultas**: Los usuarios finales pueden crear y gestionar incidentes a través de diferentes canales.
- **Escalamiento automático de incidentes**: El sistema identifica incidentes no resueltos y los escala automáticamente según las reglas de negocio.
- **Tableros de control en tiempo real**: Visualización de estadísticas, tiempos de resolución y datos relacionados con la atención al cliente.
- **Analítica predictiva**: Utiliza IA para sugerir soluciones a los agentes de soporte y mejorar el tiempo de resolución de incidentes.
- **Alta escalabilidad**: Diseñado para manejar hasta 1000 incidentes simultáneos con tiempos de respuesta óptimos.
- **Seguridad y confidencialidad**: Implementación de autenticación JWT y control de acceso basado en roles (RBAC).

## Configuración del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/abcall.git
cd abcall
