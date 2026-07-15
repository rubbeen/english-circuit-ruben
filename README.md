# English Circuit

**Inglés desde cero para ingeniería y vida cotidiana.** Aplicación React/TypeScript offline-first, PWA y Android para adultos hispanohablantes desde nivel A0.

## Estado productivo

Incluye 24 semanas, 72 lecciones, repetición espaciada, voz `en-US`, grabaciones exclusivamente locales, progreso en IndexedDB, respaldo JSON y sincronización Firebase opcional. No contiene publicidad, rastreadores, Cloud Functions ni uso de Firebase Storage.

- Web: https://english-circuit-ruben.web.app
- Android: `com.ruben.englishcircuit`, versión `1.0.0` (`versionCode 1`).
- Release: https://github.com/rubbeen/english-circuit-ruben/releases/tag/v1.0.0

## Desarrollo

Requiere Node 22.12 o superior y Java 21 para Firebase Emulator Suite y Android.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test
CONTENT_PHASE=final npm run validate:content
npm run build
```

Copie `.env.example` a `.env` solo para desarrollo autorizado. Sin variables la aplicación conserva el modo local y no inicializa Firebase. Los valores productivos viven en el Environment de GitHub `production`, nunca en Git.

## Documentación

- [Arquitectura](ARCHITECTURE.md)
- [Interfaz adaptativa](ADAPTIVE_UI.md)
- [Firebase](FIREBASE_INTEGRATION.md)
- [Android](ANDROID.md)
- [Despliegue](DEPLOYMENT.md)
- [Seguridad](SECURITY.md)
- [Privacidad](PRIVACY.md)
- [Recuperación](RECOVERY.md)
- [Calidad](QA_REPORT.md)

La aplicación financiera es independiente. Este repositorio no contiene ni consulta datos financieros y ningún workflow despliega sobre su Hosting.
