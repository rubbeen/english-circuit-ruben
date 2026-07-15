# Android

- App: English Circuit.
- Package: `com.ruben.englishcircuit`.
- Firebase Android App ID: `1:459907047052:android:2a13dc8875f0240af965a9`.
- Versión: `1.0.0`; `versionCode 1`.
- minSdk 24; target/compileSdk 36.
- Orientación libre.

## Firma release

El keystore independiente está fuera del repositorio y es indispensable para todas las actualizaciones futuras. Alias: `english-circuit`.

- SHA-1: `54:FE:0C:E2:52:DA:FD:19:AA:C7:29:76:4F:8C:A9:21:D1:FD:FA:EF`.
- SHA-256: `3B:7C:55:96:81:1E:23:53:77:E1:8B:69:27:2E:A6:FC:78:19:F6:DB:67:0F:CB:C2:48:46:F3:C5:28:83:01:1C`.

La firma local usa `android/keystore.properties`, ignorado por Git. CI reconstruye el keystore con cuatro secretos `ENGLISH_ANDROID_*` y borra ambos archivos temporales con `if: always()`.

## Compilación

```bash
npm run build
npx cap sync android
cd android
gradlew.bat clean lint test assembleRelease bundleRelease --no-daemon
```

Artefactos `v1.0.0`:

- APK SHA-256: `f7ee557f2de7f26084a25aaf5cbfce6e6469bb127311a8136040d2e526a719d4`.
- AAB SHA-256: `d6117c4b3e991d2adab949ae0b3f1f54510785b086259140f3fb7de39417d920`.

APK Signature Scheme v2 y firma JAR del AAB fueron verificadas. Los permisos funcionales son Internet, estado de red y micrófono; AndroidX añade un permiso interno no exportado del propio package. No existen permisos de ubicación, cámara, contactos, SMS, llamadas ni almacenamiento general.

`google-services.json` no es necesario para el SDK web usado dentro de WebView y permanece ignorado.
