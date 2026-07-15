# Decisiones

## D-001 — Repositorio independiente

English Circuit se implementa desde cero en `rubbeen/english-circuit-ruben`. La aplicación financiera solo se inspeccionó en modo lectura.

## D-002 — Stack y navegación

Se usa React 19, TypeScript estricto, Vite 8, React Router 7 con `HashRouter`, CSS nativo y container queries. `HashRouter` evita reglas de reescritura especiales dentro de Capacitor y mantiene rutas estables en Hosting.

## D-003 — Offline-first

El contenido reside en módulos locales cargados dinámicamente por semana. El progreso se escribe primero en IndexedDB mediante contratos de repositorio y después se encola para Firebase. La UI nunca importa Firestore ni IndexedDB.

## D-004 — Dependencias pequeñas y justificadas

`idb` encapsula la API IndexedDB sin introducir estado global. `zod` valida entorno, contenido y respaldos en límites del sistema. Firebase se importa de forma modular. No se incorporan librerías de gráficos, iconos, fechas, animación ni estado global.

## D-005 — Identidad Firebase separada

El proyecto Firebase compartido es `control-financiero-ruben`, pero English Circuit usa su propio `VITE_FIREBASE_APP_ID`, Package ID `com.ruben.englishcircuit`, sitio `english-circuit-ruben` y target `english`. No se reutiliza el App ID financiero.

## D-006 — Acceso sin conexión

El estudio local no requiere iniciar sesión. La autenticación por email y contraseña, con email verificado, habilita sincronización remota cuando existe configuración válida y conectividad.

