# Massage

System CRM do zarządzania salonem masażu — klienci, rezerwacje i kalendarz w jednym miejscu.
Jest to rekonstrukcja aplikacji "thairapy front".
Po rekonstrukcji warto wyrzucić starą aplikację aby był porządek.

## Technologie

- HTML, CSS, JavaScript
- Tailwind CSS (standalone)
- daisyUI

## Instalacja

Sklonuj repozytorium:

```bash
git clone https://github.com/TWOJE_KONTO/massage.git
cd massage
```

## Tryby pracy

Projekt obsługuje dwa tryby. Wybór polega na (od)komentowaniu odpowiednich bloków w `index.html`.

### Tryb CDN (domyślny)

Tailwind i daisyUI ładowane są z internetu — nie wymaga instalacji.

W `index.html` aktywny pozostaje blok `TRYB CDN`, blok `TRYB BINARKI` zakomentowany.

Uruchomienie: otwórz projekt w VS Code i kliknij **Go Live** (plugin Live Server).

### Tryb binarki (lokalny)

Tailwind i daisyUI działają lokalnie — pracuje offline, generuje zoptymalizowany `output.css`.

1. W `index.html` zakomentuj blok `TRYB CDN` i odkomentuj blok `TRYB BINARKI`.
2. Pobierz binarki:
```
scripts\install-tailwind-daisy.bat
```
3. W osobnym terminalu uruchom watcher generujący `output.css`:
```
scripts\watch.bat
```
4. Otwórz projekt w VS Code i kliknij **Go Live**.

## Podgląd na telefonie

Aby wyświetlić stronę na telefonie w czasie rzeczywistym (z live reload):

**Warunek:** telefon i komputer muszą być w tej samej sieci Wi-Fi lub komputer podłączony do hotspota z telefonu.

1. Uruchom **Live Server** w VS Code (przycisk **Go Live**).
2. Otwórz **CMD** na komputerze i wpisz:
```
ipconfig
```
3. Znajdź sekcję **Wi-Fi** i skopiuj wartość **IPv4 Address** (np. `10.23.96.81`).
4. Na telefonie w przeglądarce wpisz:
```
10.23.96.81:5500
```

> **Uwaga:** IP może się zmienić po wyłączeniu/włączeniu hotspota — wtedy sprawdź ponownie przez `ipconfig`.