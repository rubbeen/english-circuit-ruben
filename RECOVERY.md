# Recuperación y rollback

Antes de importar destructivamente se descarga un respaldo. Un archivo se acepta solo si declara `application: english-circuit` y `schemaVersion: 1` y sus datos pasan validación.

Para rollback web, vuelva a desplegar un artefacto validado anterior usando únicamente `hosting:english`. Para reglas, revierta el commit, ejecute emuladores y despliegue solo reglas/índices tras aprobación. Nunca restaure ni migre colecciones financieras desde este repositorio.

