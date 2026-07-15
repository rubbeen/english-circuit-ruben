# Despliegue

Sitio previsto: `english-circuit-ruben`. Target local: `english`. Comando permitido:

```bash
firebase deploy --only hosting:english --project control-financiero-ruben
```

Antes: registrar Web App, crear/asociar el sitio con `firebase target:apply hosting english english-circuit-ruben`, configurar secretos, ejecutar guards y todas las pruebas. El workflow exige aprobación del environment.

Las reglas tienen workflow manual separado. Nunca se despliegan junto con Hosting. No se ejecutó ningún despliegue productivo durante la construcción.

