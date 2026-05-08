# Belka — Public Website

Statische HTML-Seiten zum Hosten der **Privacy Policy**, **Terms of Use** und **Support-Seite**, die Apple für die App-Store-Submission verlangt.

Die Inhalte stammen aus:
- `RuWortschatz/Resources/Legal/privacy-policy.md`
- `RuWortschatz/Resources/Legal/terms-of-use.md`
- `AppStoreAssets/compliance/support.md`

Wenn sich diese Quell-Dokumente ändern, müssen die HTML-Pages hier ebenfalls aktualisiert werden.

## Was steckt drin?

| Datei | Zweck | Sprache |
|---|---|---|
| `index.html` | Landing Page mit Navigation zu Privacy / Terms / Support | DE |
| `privacy.html` | Datenschutzerklärung | DE |
| `privacy-en.html` | Privacy Policy | EN |
| `terms.html` | Nutzungsbedingungen (AGB) | DE |
| `terms-en.html` | Terms of Use | EN |
| `support.html` | FAQ und Kontakt | DE |

Alle Seiten sind self-contained: HTML + Inline-CSS, keine externen Assets, keine Build-Tools, keine Dependencies. Sie laden in unter 50 ms auf 4G.

Style-Sprache: **Soft Folk** — passt zur App. Hintergrund `#FFF0E2`, Akzent `#E89588`. System-Fonts (Apple-Stack mit serif-Headlines), keine Custom-Fonts (sonst müssten User 150 KB Caprasimo runterladen für eine Privacy-Page).

---

## Hosting via GitHub Pages

GitHub Pages ist die einfachste, kostenlose Lösung — und genau das, was Apple bei „Privacy Policy URL" akzeptiert.

### Schritt 1 — Neues Repo anlegen

1. Auf [github.com/new](https://github.com/new) ein **neues, public** Repository erstellen.
2. Name: `belka-website` (oder ein beliebiger Name; spätere URL hängt davon ab).
3. Auf **„Create repository"** klicken. Ohne README/License/`.gitignore` lassen.

### Schritt 2 — Inhalte pushen

Im Terminal:

```bash
cd /tmp
git clone https://github.com/<DEIN-USER>/belka-website.git
cp -R /Users/dennisachtziger/Documents/Projekte/RuWortschatzApp/AppStoreAssets/website/*.html belka-website/
cd belka-website
git add .
git commit -m "Initial Belka website (privacy, terms, support, index)"
git push origin main
```

> Tipp: Die `README.md` (diese Datei) brauchst du auf der Hosting-Seite nicht zwingend — nur die `.html`. Du kannst sie aber mit pushen, schadet nicht.

### Schritt 3 — Pages aktivieren

1. Im Repo auf **Settings** → **Pages**.
2. Unter **Source**: Branch `main` / Folder `(root)` auswählen.
3. **Save**.
4. Nach 1–2 Minuten ist die Seite live.

### Schritt 4 — Live-URL prüfen

Standard-URL:

```
https://<DEIN-USER>.github.io/belka-website/
```

Öffne die URL einmal im Browser. Du solltest die Belka-Landing-Page sehen, mit drei Karten (Datenschutz, Nutzungsbedingungen, Support). Klicke alle Links durch — keine 404s.

### Schritt 5 — URLs in App Store Connect eintragen

In **App Store Connect → App-Information / App-Privacy**:

| Feld | URL |
|---|---|
| **Privacy Policy URL** (Pflicht) | `https://<DEIN-USER>.github.io/belka-website/privacy.html` |
| **Support URL** (Pflicht) | `https://<DEIN-USER>.github.io/belka-website/support.html` |
| **Marketing URL** (optional) | `https://<DEIN-USER>.github.io/belka-website/` |

Apple prüft die URLs während des Reviews. Vor jedem Submit kurz im Browser öffnen — keine 404, keine „Coming soon"-Seite.

### Schritt 6 (optional) — Custom Domain

Falls du `belka.app` oder eine andere Domain besitzt:

1. Im Repo: **Settings** → **Pages** → **Custom domain** → `belka.app` eintragen → **Save**.
2. Beim Domain-Registrar einen `CNAME`-Eintrag setzen, der auf `<DEIN-USER>.github.io` zeigt (oder, für Apex-Domains, A-Records auf GitHubs IPs — siehe [GitHub-Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. Warten, bis DNS propagiert (Minuten bis ~24 h).
4. **Enforce HTTPS** im selben Pages-Settings-Panel aktivieren.
5. URLs in ASC dann auf z. B. `https://belka.app/privacy.html` aktualisieren.

---

## Updates später

Wenn Privacy oder Terms sich ändern (z. B. neuer Drittanbieter):

1. Quell-Dokument im Repo (`RuWortschatz/Resources/Legal/...`) aktualisieren.
2. Entsprechende HTML-Datei hier in `AppStoreAssets/website/` synchron halten.
3. In das Hosting-Repo `belka-website` kopieren und committen.
4. Stand-Datum (`Stand: Mai 2026` bzw. `Last updated: May 2026`) anpassen.
5. Wesentliche Änderungen in der App selbst kommunizieren (Banner / Modal).
