# Reglas permanentes de English Circuit

## Límites de seguridad

- Este repositorio solo contiene English Circuit. Nunca se convierte el proyecto financiero en monorepo.
- El repositorio `rubbeen/control-financiero-ruben` es referencia de solo lectura. No se crean ramas, commits, despliegues ni migraciones allí.
- Está prohibido leer o escribir datos financieros y consultar las rutas `accounts`, `categories`, `movements`, `budgets` o `users/{uid}/meta`.
- Los datos educativos remotos viven exclusivamente bajo `users/{uid}/apps/english`.
- El Package ID permitido es `com.ruben.englishcircuit`; `com.ruben.controlfinanciero` está prohibido.
- Firebase Project ID es `control-financiero-ruben`, pero English Circuit requiere Web App, Android App y Hosting site independientes.
- El único target de Hosting permitido es `english`; nunca ejecutar `firebase deploy` sin `--only` explícito.
- No desplegar Hosting, reglas, índices ni recursos productivos sin autorización expresa.
- No cambiar proveedores globales de Authentication, no activar facturación y no usar Cloud Functions ni Firebase Storage.
- Storage permanece bloqueado. Las grabaciones son locales y nunca se sincronizan.
- No versionar `.env`, secretos, tokens, cuentas de servicio, `google-services.json`, keystores ni contraseñas.

## Puertas de calidad

Una fase solo se cierra cuando sus scripts aplicables pasan. TypeScript es estricto, la UI no accede a persistencia directamente y todo cambio de datos pasa por servicios de aplicación y contratos de repositorio. La orientación permanece libre y las pantallas se prueban por tamaño de ventana, no por `userAgent`.

