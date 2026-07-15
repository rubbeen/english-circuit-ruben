# Integración Firebase

Proyecto: `control-financiero-ruben`. English Circuit requiere Web App y Android App independientes; no reutiliza el App ID financiero.

El proveedor confirmado es email/contraseña y se exige correo verificado. Sin `.env` la aplicación no inicializa Firebase. Los datos se limitan al documento `users/{uid}/apps/english` y las subcolecciones `lessonProgress`, `reviewCards`, `studySessions` y `statistics`.

La cola es local. Cada guardado actualiza IndexedDB y registra una operación determinista. Al sincronizar se usa `setDoc(..., {merge:true})`, `serverTimestamp`, backoff limitado y borrado de cola solo tras confirmación.

Las reglas preservan las reglas financieras inspeccionadas, agregan el namespace educativo antes del bloqueo final y mantienen Storage denegado. Para probar:

```bash
npx firebase emulators:exec --only firestore,storage --project demo-english-circuit "npm run test:firestore-rules"
```

En Windows puede ser necesario dejar que el runtime de Storage termine su primera descarga antes de repetir el comando.

