# Descubrimiento y protección

Fecha: 2026-07-14. La inspección fue de configuración y código, nunca de datos de usuarios.

## English Circuit

- El directorio inicial estaba vacío y no era un repositorio Git.
- `rubbeen/english-circuit-ruben` no existía todavía en GitHub.
- Entorno disponible: Git 2.55.0, GitHub CLI 2.96.0 autenticado, Node portátil 24.18.0, npm 11.16.0, JDK portátil 21 y Android SDK reutilizable como herramienta local.
- Versiones consultadas en npm el 2026-07-14: React 19.2.7, Vite 8.1.4, Firebase 12.16.0, Capacitor 8.4.2, React Router 7.18.1, TypeScript 7.0.2, Vitest 4.1.10 y Playwright 1.61.1.

## Referencia financiera de solo lectura

Repositorio: `rubbeen/control-financiero-ruben`, rama `main`, limpio y con remoto `origin` correcto.

- Frontend observado: React 18.3.1, Vite 6.0.7, Firebase 12.15.0 y Capacitor 7.0.1.
- Authentication implementado: email y contraseña. La aplicación rechaza usuarios con `emailVerified === false`.
- Firestore: rutas owner-only bajo `users/{uid}` para `accounts`, `categories`, `movements`, `budgets` y documentos `meta`; el bloqueo final deniega rutas desconocidas.
- Las reglas exigen `request.auth.uid == userId` y `email_verified == true`.
- Storage está completamente bloqueado.
- Package ID financiero confirmado: `com.ruben.controlfinanciero`.
- Android permite cambios de orientación y tamaño; no declara orientación fija.
- El `firebase.json` de la copia inspeccionada contiene reglas e emuladores, pero no un target Hosting. No se encontró `.firebaserc` en esa copia.
- Los workflows de Android usan Node 20, Java 21 y secretos separados. No se copiaron secretos, keystores ni archivos `.env`.

## Riesgos y mitigaciones

1. Proyecto Firebase compartido: se aplican guardas de namespace, Package ID, target y arquitectura; cualquier despliegue productivo queda bloqueado por proceso manual.
2. Reglas compartidas: `firestore.rules` parte de la estructura financiera observada y agrega solo el namespace educativo. Su despliegue requiere emuladores y aprobación.
3. App IDs no disponibles: se usan variables vacías en `.env.example`; el modo local sigue operativo y no inventa credenciales.
4. Hosting secundario no verificado: se prepara el target `english`, pero crear/asociar el sitio queda como paso productivo manual.
5. Proveedor Auth: solo se implementa email/contraseña porque es el proveedor confirmado por código; no se modifica Authentication global.

