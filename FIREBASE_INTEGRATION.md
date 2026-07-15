# Integración Firebase

## Recursos registrados

- Project ID: `control-financiero-ruben`.
- Web App: **English Circuit Web** — `1:459907047052:web:a82f1c2b3e9d2807f965a9`.
- Android App: **English Circuit Android** — `1:459907047052:android:2a13dc8875f0240af965a9`.
- Package Android: `com.ruben.englishcircuit`.
- Hosting site: `english-circuit-ruben`; target local: `english`.

Ningún App ID o package ID financiero se reutiliza. El bucket aparece en la configuración estándar del SDK, pero Firebase Storage no está habilitado ni se utiliza y sus reglas continúan denegando todo acceso.

## Autenticación y sincronización

El proveedor es email/contraseña y se exige correo verificado. Sin `.env` la aplicación no inicializa Firebase. Los datos se limitan a:

```text
users/{uid}/apps/english
users/{uid}/apps/english/lessonProgress/{lessonId}
users/{uid}/apps/english/reviewCards/{cardId}
users/{uid}/apps/english/studySessions/{sessionId}
users/{uid}/apps/english/statistics/{documentId}
```

Cada guardado actualiza IndexedDB y encola un `upsert` determinista. La sincronización empuja primero las operaciones pendientes con backoff, usa `serverTimestamp` y elimina la cola solo después de confirmación. Con la cola vacía descarga el snapshot educativo y fusiona por `updatedAt`; esto permite recuperar el progreso en otro navegador sin duplicados. Grabaciones, credenciales y datos financieros nunca forman parte del payload.

El humo productivo validó sesión persistente, cierre de sesión, rechazo de correo no verificado, progreso parcial, borrador, seis tarjetas, una sesión y recuperación cruzada.

## Secretos y permisos CI

El Environment `production` exige aprobación manual y contiene los seis secretos `VITE_FIREBASE_*`, `FIREBASE_SERVICE_ACCOUNT_CONTROL_FINANCIERO_RUBEN` y cuatro secretos `ENGLISH_ANDROID_*`.

La cuenta `english-circuit-publisher@control-financiero-ruben.iam.gserviceaccount.com` tiene únicamente:

- `roles/firebasehosting.admin`.
- `roles/firebaserules.admin`.
- `roles/serviceusage.apiKeysViewer`.

## Reglas

Las reglas productivas inspeccionadas se conservaron y el namespace educativo se añadió antes del bloqueo final. Los índices financieros productivos no se tocaron. Prueba local:

```bash
npx firebase emulators:exec --only firestore,storage --project demo-english-circuit "npm run test:firestore-rules"
```

Resultado final: 10/10.
