# Generador Rawtext/Titleraw/Tellraw (Minecraft Bedrock/Education)

Webapp sencilla en `HTML + CSS + JS` para generar:

- `rawtext` (JSON)
- `/titleraw` con selector personalizado (`@a`, `@p`, `@a[tag=hola]`, etc.)
- `/tellraw` con selector personalizado (`@a`, `@p`, `@a[tag=hola]`, etc.)
- modo de contenido directo o localizado
- salida extra para archivo `.lang` (`key=texto`)

## Ejecutar en Windows (doble click)

1. Haz doble click en `Abrir Generador Minecraft.bat`.
2. Se abrirá `webapp/index.html` en tu navegador predeterminado.

También puedes abrir `webapp/index.html` directamente con doble click.

## Uso

1. Elige el tipo de salida (`rawtext`, `titleraw` o `tellraw`).
2. Elige el tipo de contenido:
   - `Texto directo`: usa el texto visible en el JSON.
   - `Texto localizado`: usa una `Key de localización` en el comando y genera `key=texto` para `.lang`.
3. Si eliges `titleraw` o `tellraw`, completa el selector.
4. Si eliges `titleraw`, completa además la `Visualización` (`title`, `subtitle` o `actionbar`).
5. Escribe el texto:
   - directo: texto visible (puedes usar `§`).
   - localizado: texto que irá al archivo `.lang`.
   - en la salida `.lang`, los saltos de línea se convierten a `%1`.
6. Copia con `Copiar comando` y, si aplica, `Copiar .lang`.
