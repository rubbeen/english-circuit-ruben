# Interfaz adaptativa

Tokens: compacta `<600`, media `600–839`, expandida `840–1199`, grande `≥1200` CSS px; una ventana con alto `<600` reduce chrome vertical. No se usa `userAgent`.

- Compacta: columna única, top bar y navegación inferior.
- Media: rail de navegación y cuadrículas de dos columnas.
- Expandida/grande: sidebar persistente, índice de lección y contenido limitado.
- Safe areas, `dvh`, controles de 48 px, foco visible, reducción de movimiento, modo oscuro y container queries están integrados.

Playwright verifica 16 viewports, texto al 200 %, tema oscuro, rotación, persistencia y ausencia de overflow horizontal.

