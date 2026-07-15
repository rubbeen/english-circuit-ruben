# Android

App name: English Circuit. App ID: `com.ruben.englishcircuit`. Web dir: `dist`.

```bash
npm run build
npx cap sync android
cd android
gradlew.bat assembleDebug
```

Se permiten Internet, estado de red y micrófono. No hay permisos de ubicación, cámara, contactos, SMS, llamadas ni almacenamiento general. La orientación no está bloqueada y la actividad maneja cambios de pantalla, teclado y UI mode.

El AAB/release requiere cuatro secretos de keystore; el workflow falla si falta alguno. `google-services.json` no es necesario para el SDK web usado dentro de WebView y está ignorado.

