# English Circuit

**Inglés desde cero para ingeniería y vida cotidiana.** Aplicación React/TypeScript offline-first, PWA y Android para adultos hispanohablantes desde nivel A0.

## Estado

Implementa 24 semanas, 72 lecciones principales, prácticas, repetición espaciada, voz `en-US`, grabaciones locales, progreso IndexedDB, respaldo JSON, sincronización Firebase opcional, interfaz adaptativa y compilación Capacitor. No contiene publicidad, rastreadores, Cloud Functions ni Firebase Storage.

## Desarrollo

Requiere Node 22.12 o superior y Java 21 para emuladores/Android.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run test
CONTENT_PHASE=final npm run validate:content
npm run build
```

Copie `.env.example` a `.env` únicamente después de registrar la Web App independiente **English Circuit Web**. Sin esas variables la aplicación funciona en modo local y no inicializa Firebase.

## Documentación

- [Arquitectura](ARCHITECTURE.md)
- [Interfaz adaptativa](ADAPTIVE_UI.md)
- [Firebase](FIREBASE_INTEGRATION.md)
- [Android](ANDROID.md)
- [Despliegue](DEPLOYMENT.md)
- [Seguridad](SECURITY.md)
- [Privacidad](PRIVACY.md)
- [Recuperación](RECOVERY.md)
- [Decisiones](DECISIONS.md)
- [Descubrimiento](DISCOVERY.md)
- [Contribución](CONTRIBUTING.md)
- [Atribuciones](ATTRIBUTIONS.md)

La aplicación financiera es independiente. Este repositorio no contiene ni consulta datos financieros y ningún workflow despliega sobre su Hosting.

