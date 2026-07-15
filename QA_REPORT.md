# Informe final de calidad

Fecha: 2026-07-14. Rama: `main`. Repositorio: `rubbeen/english-circuit-ruben`.

## Web y aplicación

- Guards `project`, `firebase`, `security` y `release`: correctos.
- Typecheck y lint: correctos, cero warnings.
- Vitest: 9 archivos, 13/13 pruebas.
- Contenido: 24 semanas, 72 lecciones, IDs únicos y actividades completas.
- Playwright E2E: 3/3.
- Responsive: 17/17, incluidos landscape, texto ampliado y tema oscuro; sin overflow horizontal.
- Offline: 1/1 sobre lección visitada y persistencia local.
- Bundle inicial aproximado: 320.3 KB gzip; CSS 6.3 KB gzip; chunk Firebase 223.8 KB gzip.
- Producción: HTTPS, manifest PWA, modo standalone, service worker actualizable y rutas SPA verificados.

## Firebase productivo

- Web App y Android App independientes registrados.
- Hosting `english-circuit-ruben` desplegado en https://english-circuit-ruben.web.app.
- Email/contraseña verificado: inicio, persistencia, cierre y mensaje para correo no verificado correctos.
- Humo educativo: progreso parcial, borrador, finalización, seis tarjetas y una sesión.
- Segundo navegador: progreso y borrador recuperados desde Firestore.
- Firestore: 1 progreso/1 ID único, 6 tarjetas/6 IDs únicos, 1 sesión/1 ID único y perfil raíz sin el ID local.
- Namespace usado: exclusivamente `users/{uid}/apps/english` y sus cuatro subcolecciones permitidas.
- Reglas productivas: desplegadas de forma separada; emuladores 10/10.
- Índices financieros, Storage y Hosting financiero: no modificados.

## Android release

- `npx cap sync android`: correcto.
- Gradle `clean lint test assembleRelease bundleRelease`: `BUILD SUCCESSFUL` (501 tareas).
- APK: 2,511,874 bytes; AAB: 2,874,436 bytes.
- Package `com.ruben.englishcircuit`; versionCode 1; versionName 1.0.0; minSdk 24; target/compileSdk 36.
- APK Signature Scheme v2: verificado; AAB JAR: verificado.
- GitHub Release `v1.0.0`: pública, no prerelease, con APK, AAB y `SHA256SUMS.txt`; workflow protegido correcto.
- APK SHA-256: `f7ee557f2de7f26084a25aaf5cbfce6e6469bb127311a8136040d2e526a719d4`.
- AAB SHA-256: `d6117c4b3e991d2adab949ae0b3f1f54510785b086259140f3fb7de39417d920`.
- Permisos: Internet, estado de red, micrófono y permiso interno no exportado; ningún permiso prohibido.
- Orientación: sin declaración fija en el APK.
- Emulador Pixel 4 API 30: instalación y arranque correctos, actividad reanudada y cero cierres fatales.

## Pendientes y limitaciones reales

- Prueba manual física en Samsung Galaxy A33 y Galaxy Tab S10 FE.
- Micrófono, pronunciación, teclado, split-screen y rotación visual deben confirmarse en esos dispositivos; el AVD headless no reflejó el cambio de superficie aunque la actividad sobrevivió y las pruebas web landscape pasaron.
- Cinco avisos moderados transitivos de herramientas permanecen documentados; no afectan el resultado de guards/build.

## Confirmaciones

- Aplicación financiera modificada: no.
- Datos financieros consultados: no.
- Hosting financiero modificado: no.
- Storage habilitado: no.
- Facturación activada: no.
- Cloud Functions usadas: no.
- Orientación bloqueada: no.
- Secretos publicados: no.
