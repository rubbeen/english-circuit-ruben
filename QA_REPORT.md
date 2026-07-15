# Informe final de calidad

Fecha: 2026-07-14. Rama: `main`. Repositorio: `rubbeen/english-circuit-ruben`.

## Resultados ejecutados

- `npm ci`: correcto, 997 paquetes instalados de `package-lock.json`.
- `npm run typecheck`: correcto.
- `npm run lint`: correcto, cero warnings.
- `npm run test`: 7 archivos, 10 pruebas, todas correctas.
- `CONTENT_PHASE=final npm run validate:content`: 24 semanas, 72 lecciones, IDs únicos y actividades completas.
- `npm run build`: correcto, 24 chunks semanales separados.
- `npm run test:e2e`: 3/3.
- `npm run test:responsive`: 17/17; cubre 16 viewports más texto 200 %/tema oscuro, sin overflow horizontal.
- `npm run test:offline`: 1/1; lección visitada funciona offline y conserva progreso al reconectar.
- Accesibilidad: foco/salto al contenido, estructura, nombres de botones, teclado, texto ampliado, contraste/tema y reduced motion verificados automáticamente.
- Reglas/emuladores: 10/10; propietario, otro usuario, no autenticado, correo no verificado, perfil inválido, documento válido, ruta desconocida, rutas financieras y Storage bloqueado.
- `npm run analyze:bundle`: JavaScript inicial aproximado 319.7 KB gzip (presupuesto 450 KB); CSS 6.3 KB gzip (presupuesto 80 KB); cada semana 0.6–0.75 KB gzip.
- `guard:project`, `guard:firebase`, `guard:security`: correctos.
- `npx cap sync android`: correcto.
- `gradlew.bat assembleDebug`: correcto.
- APK: package `com.ruben.englishcircuit`, versionCode 1, minSdk 24, target/compileSdk 36, firma debug APK Signature v2 verificada.
- Permisos APK: Internet, estado de red y micrófono; ninguno de ubicación, cámara, contactos, SMS, llamadas o almacenamiento general.
- SHA-256 APK: `D086F1D9FE7B9308814CE56E6F1CBC1A7FA56AD044DDE4C113A789CF0E6E2EEE`.
- `npm audit --omit=dev`: 0 vulnerabilidades de producción. Cinco avisos moderados transitivos están limitados a `firebase-tools` de desarrollo y documentados en `SECURITY.md`.

## Recursos preparados, no creados ni desplegados

- Firebase Project ID: `control-financiero-ruben`.
- Web App pendiente: **English Circuit Web**; falta un App ID independiente y API key válidos.
- Android App Firebase pendiente: **English Circuit Android**, Package ID `com.ruben.englishcircuit`.
- Hosting site previsto: `english-circuit-ruben`; target local `english`.
- No existe URL productiva porque no se creó ni desplegó el sitio.
- AAB/release firmado pendiente por ausencia de keystore y cuatro secretos `ENGLISH_ANDROID_*`.
- `guard:release` falla deliberadamente mientras falten las variables Firebase y `CONTENT_PHASE=final` en el entorno de release.

## Confirmaciones de protección

- La aplicación financiera y su repositorio no fueron modificados.
- No se leyó ni escribió ningún dato financiero.
- No se desplegaron reglas, índices, Storage ni Hosting.
- No se desplegó sobre el Hosting financiero.
- Las reglas financieras inspeccionadas se conservaron antes de agregar el namespace educativo.
- Storage permanece bloqueado y las grabaciones son exclusivamente locales.
- La orientación permanece libre; no existe bloqueo portrait/landscape.
- Las respuestas y borradores persisten al rotar/redimensionar, recargar y trabajar offline.
