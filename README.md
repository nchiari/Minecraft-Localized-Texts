# Rawtext/Titleraw/Tellraw Generator (Minecraft Bedrock/Education)

Simple `HTML + CSS + JS` web app to generate:

- `rawtext` (JSON)
- `/titleraw` with custom selector (`@a`, `@p`, `@a[tag=hello]`, etc.)
- `/tellraw` with custom selector (`@a`, `@p`, `@a[tag=hello]`, etc.)
- direct or localized content mode
- extra `.lang` output (`key=text`)

## Run on Windows (double-click)

1. Double-click `Minecraft Generator.bat`.
2. It will open `webapp/index.html` in your default browser.

You can also open `webapp/index.html` directly with a double-click.

## Usage

1. Choose the output type (`rawtext`, `titleraw`, or `tellraw`).
2. Choose the content mode:
   - `Direct text`: uses visible text directly in JSON.
   - `Localized text`: uses a localization key in the command and generates `key=text` for `.lang`.
3. If you choose `titleraw` or `tellraw`, fill in the selector.
4. If you choose `titleraw`, also set `Display` (`title`, `subtitle`, or `actionbar`).
5. Write your text:
   - direct: visible text (you can use `§`).
   - localized: text that will go into the `.lang` file.
   - in `.lang` output, line breaks are converted to `%1`.
6. Copy using `Copy command` and, when available, `Copy .lang`.
