# Despliegue

Producción web: https://english-circuit-ruben.web.app

- Firebase project: `control-financiero-ruben`.
- Hosting site independiente: `english-circuit-ruben`.
- Target local: `english`.
- Carpeta publicada: `dist`.
- Environment GitHub: `production`, con aprobación manual.

## Hosting

```bash
npm ci
CONTENT_PHASE=final npm run guard:release
npm run build
firebase deploy --only hosting:english --project control-financiero-ruben
```

El comando sin `--only` está prohibido. El workflow manual `.github/workflows/deploy-hosting.yml` reconstruye, valida y publica exclusivamente el target `english` usando credenciales temporales.

## Firestore

Las reglas se validan y despliegan por separado:

```bash
npx firebase emulators:exec --only firestore,storage --project demo-english-circuit "npm run test:firestore-rules"
firebase deploy --only firestore:rules --project control-financiero-ruben
```

El workflow no despliega `firestore:indexes`: producción ya contiene un índice financiero que no pertenece a este repositorio y no debe sustituirse. Storage, Cloud Functions y facturación permanecen fuera del despliegue.

## Release Android

El tag `v1.0.0` activa `.github/workflows/android-release.yml`. Tras aprobación manual, CI reconstruye el keystore temporal, ejecuta guards/build/Gradle, publica APK, AAB y `SHA256SUMS.txt`, y elimina los archivos de firma temporales.
