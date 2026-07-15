# Recuperación y rollback

## Datos educativos

Antes de una importación destructiva se descarga un respaldo. Solo se acepta `application: english-circuit`, `schemaVersion: 1` y datos que pasen el esquema. Grabaciones, tokens y credenciales se excluyen. Nunca use este repositorio para restaurar o migrar colecciones financieras.

## Hosting

1. Identifique en Firebase Hosting la versión anterior del sitio `english-circuit-ruben`.
2. Use la opción de rollback de esa versión o reconstruya un commit estable.
3. Publique únicamente con `firebase deploy --only hosting:english --project control-financiero-ruben`.
4. Verifique HTTPS, manifest, service worker y que el sitio financiero siga siendo el sitio `default` independiente.

## Firestore Rules

1. Compare la versión productiva con `firestore.rules`.
2. Revierta el commit de reglas en una rama de corrección; no elimine datos.
3. Ejecute las 10 pruebas con emuladores.
4. Tras aprobación, despliegue únicamente `firestore:rules`.
5. Confirme que las rutas financieras y el bloqueo de Storage permanecen intactos.

## Android

1. Incremente `versionCode` y ajuste `versionName`.
2. Use exactamente el mismo keystore independiente; perderlo impide actualizar la aplicación firmada.
3. Ejecute lint, tests, `assembleRelease`, `bundleRelease`, verificación de firma y nuevos checksums.
4. Pruebe instalación/actualización antes de reemplazar artefactos públicos.

## GitHub Release

Mantenga tag, título y versión coherentes. Para corregir archivos, reconstruya desde el commit correspondiente, verifique hashes y reemplace solo APK/AAB/checksums en la release. Nunca adjunte keystore, `.env`, cuenta de servicio o APK debug.
