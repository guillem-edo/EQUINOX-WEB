# Instrucciones para Migrar el Sitio Web EQUINOX

Este documento proporciona instrucciones para migrar el sitio web EQUINOX a un servidor de producción y establecer un entorno de desarrollo independiente.

## 1. Opciones de Alojamiento Web

Existen varias opciones para alojar el sitio web en producción:

### Opción A: Hosting Compartido (más simple)
- Ejemplos: SiteGround, Hostinger, Webempresa, Raiola, etc.
- Proceso: Subir los archivos mediante FTP o el gestor de archivos del panel de control
- Ventajas: Fácil configuración, bajo mantenimiento
- Desventajas: Menor control, posiblemente menor rendimiento

### Opción B: VPS o Servidor Dedicado (más control)
- Ejemplos: DigitalOcean, AWS, OVH, etc.
- Proceso: Configurar servidor web (Apache/Nginx), subir archivos
- Ventajas: Mayor control y rendimiento
- Desventajas: Requiere más conocimientos técnicos

### Opción C: Servicio de Alojamiento Estático (rápido y económico)
- Ejemplos: Netlify, Vercel, GitHub Pages
- Proceso: Conectar repositorio o subir archivos
- Ventajas: Excelente rendimiento, fácil implementación
- Desventajas: Limitado para sitios dinámicos (aunque EQUINOX es estático)

## 2. Pasos para la Migración

### Preparación
1. Adquirir un dominio si aún no lo tiene (ej. equinox.es, equinox-inoxidables.com)
2. Contratar el servicio de alojamiento seleccionado
3. Configurar los registros DNS para apuntar a su nuevo servidor

### Migración (Hosting Compartido)
1. Acceder al panel de control del hosting (cPanel, Plesk, etc.)
2. Subir los archivos del sitio mediante FTP o el gestor de archivos
3. Descomprimir el archivo `equinox_website.zip` en el directorio público (public_html, www, htdocs, etc.)
4. Configurar certificado SSL para habilitar HTTPS

### Migración (VPS/Servidor)
1. Configurar servidor web (Apache/Nginx)
2. Configurar certificado SSL (Let's Encrypt)
3. Subir archivos vía SFTP o git
4. Configurar firewall y seguridad

### Migración (Servicio Estático)
1. Crear cuenta en Netlify/Vercel/similar
2. Subir el sitio (arrastrar y soltar el directorio o conectar a repositorio)
3. Configurar dominio personalizado

## 3. Establecer Entorno de Desarrollo

Para continuar el desarrollo mientras el sitio está en producción:

### Opción A: Entorno Local + Control de Versiones
1. Crear un repositorio Git para el proyecto
2. Trabajar localmente en una rama de desarrollo
3. Implementar cambios a producción mediante despliegue controlado

```bash
# Inicializar repositorio
git init
git add .
git commit -m "Versión inicial del sitio web"

# Crear rama de desarrollo
git checkout -b desarrollo
```

### Opción B: Subdominio de Desarrollo
1. Configurar un subdominio (ej. dev.equinox.es)
2. Implementar una copia del sitio en este subdominio
3. Realizar cambios y pruebas aquí antes de migrarlos a producción

## 4. Recomendaciones y Mejores Prácticas

- **Backups regulares**: Programar copias de seguridad periódicas
- **Pruebas**: Verificar el sitio en diferentes navegadores y dispositivos antes de publicar cambios
- **Optimización**: Utilizar herramientas como Google PageSpeed Insights para mejorar el rendimiento
- **Analytics**: Implementar Google Analytics o similar para monitorizar el tráfico

## 5. Documentación de Acceso

Crear un documento seguro con:
- Credenciales de acceso al hosting
- Credenciales FTP/SFTP
- Información del dominio y DNS
- Credenciales de cualquier servicio adicional

## 6. Mantenimiento Continuo

- **Actualizaciones de seguridad**: Mantener actualizadas las dependencias
- **Revisiones periódicas**: Verificar y actualizar el contenido
- **Monitorización**: Implementar sistema de alerta para detectar problemas

---

Para cualquier duda adicional sobre la migración, contactar al equipo de desarrollo.
