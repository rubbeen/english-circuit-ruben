# Arquitectura

La dirección de dependencias es `UI React → servicios de aplicación → dominio → contratos de repositorio`. `src/pages` y `src/ui` no acceden a Firestore ni IndexedDB; una prueba de arquitectura lo impide. La pantalla de configuración usa el adaptador de Firebase Authentication únicamente para sesión, nunca para persistencia.

`StudyService` orquesta progreso, sesiones, repaso y respaldos. Los repositorios IndexedDB implementan almacenamiento inmediato. `SyncService` consume operaciones idempotentes y `syncRemote.ts` es el único adaptador que construye rutas Firestore, siempre bajo `users/{uid}/apps/english`.

La base local usa versión 1 y stores separados para perfil, progreso, tarjetas, sesiones, estadísticas, grabaciones, cola y conflictos. Las grabaciones nunca forman parte de la cola. Los conflictos acumulativos conservan finalización, mejor puntuación y datos más recientes.

El contenido se carga dinámicamente por semana desde `src/content/course/week-XX`; el índice inicial solo contiene metadatos.
