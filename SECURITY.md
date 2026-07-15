# Seguridad

Controles: `guard:project`, `guard:firebase`, `guard:security` y `guard:release`. Detectan remoto/Package ID incorrectos, consultas financieras, secretos, Storage habilitado, Cloud Functions, orientación fija y despliegues inseguros.

Las reglas requieren propietario y email verificado. Los campos críticos del perfil se validan por tipo/rango. Las colecciones educativas permitidas son una allowlist. La prueba de arquitectura impide imports de persistencia en UI y referencias productivas a colecciones financieras.

No hay datos financieros, secretos, cuentas de servicio, keystores ni credenciales versionados.

`npm audit --omit=dev` reporta 0 vulnerabilidades de producción. El árbol completo reporta cinco avisos moderados transitivos en `firebase-tools` (`@opentelemetry/core` y `uuid`); solo afectan herramientas de desarrollo. npm propone un downgrade mayor de Firebase CLI, por lo que se conservó la versión validada y se documentó el riesgo en lugar de aplicar `--force`.
