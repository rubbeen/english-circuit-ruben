# Seguridad

Los guards verifican repositorio, Package ID, target Firebase, secretos versionados, consultas financieras, Storage habilitado, Cloud Functions, orientación fija y comandos `firebase deploy` sin `--only`. El guard de secretos analiza únicamente archivos versionables (`git ls-files --cached --others --exclude-standard`), por lo que valida el contenido publicable sin exponer el `.env` local ignorado.

Las reglas exigen UID propietario y correo verificado para English Circuit. El namespace educativo usa allowlist y valida esquema/ID; las grabaciones nunca se suben. Storage continúa con `allow read, write: if false`.

Antes del despliegue se obtuvo y comparó la versión productiva. Se preservaron sus accesos financieros existentes y se añadió únicamente `users/{uid}/apps/english`. Se desplegó solo `firestore:rules`; no se desplegaron índices, Storage, Hosting financiero ni Cloud Functions.

No hay datos financieros, secretos, cuentas de servicio, keystores ni contraseñas versionados. Durante el trabajo no se consultó ninguna ruta financiera. La inspección se limitó a metadatos de proyecto, reglas/índices desplegados y rutas educativas del usuario de humo.

La cuenta CI de publicación tiene cuatro roles específicos: Firebase Hosting Admin, Firebase Rules Admin, API Keys Viewer y Service Usage Viewer. El último solo permite inspeccionar el estado de las APIs que Firebase CLI comprueba antes de desplegar. No posee roles Editor, Owner, Firestore Data, Storage ni permisos para habilitar APIs.

`npm audit` reporta cinco avisos moderados transitivos del árbol de herramientas. No se aplicó `npm audit fix --force` porque proponía cambios mayores fuera del alcance; guards, pruebas y build permanecen verdes.
