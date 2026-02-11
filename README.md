# ATAS Help Hub

A Help Hub website built from the Governance Wiki Figma design. It includes a sticky header, collapsible sidebar navigation, home page with article cards, article pages with table of contents and highlightable terms, search (results on the right pane), and a Request Article form.

## Design

- **Home**: [Figma – node 2:2](https://www.figma.com/design/toDL6Ex1Cca8dFZ2YQeWe1/Governance-Wiki?node-id=2-2)
- **Article**: [Figma – node 3:3137](https://www.figma.com/design/toDL6Ex1Cca8dFZ2YQeWe1/Governance-Wiki?node-id=3-3137)

Colors and typography use the Figma variables (e.g. Primary Purple `#5925DC`, Greys, Inter font).

## Run locally

```bash
cd help-hub
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. http://localhost:5173).

## Features

- **Header**: “A Singapore Government Agency Website” bar, GovTech logo, Help Hub (default) / Quick Links, Request Article button. Header bar is fixed on scroll.
- **Left sidebar**: Search (results show on the right pane), Get Started (Onboarding: Get Access, Invite Users; Register Your System: Create System, Create Sub System, SCA), References (RML, Security Classification, etc.). Sidebar is fixed; inner content scrolls.
- **Right pane**: Home (hero + article cards), Article (with table of contents and smooth scroll), Search results (card layout), Request Article form.
- **Article “Get Access”**: “Agency Coordinator” is highlighted (dotted underline, light purple); click to open a popover with a short definition.
- **Footer**: Matches Figma (ATAS Help Hub, description, Report Vulnerability, Privacy Statement, Terms of use, © 2026 Government of Singapore, Last Updated 01 Jan 2026).

## Images

- **Header logo**: `public/govtech-logo.svg` is a placeholder matching the Figma description (hexagon in purple/pink, GOVTECH SINGAPORE text). To use the exact logo from Figma: open the design file, select the logo frame, use **Export** (e.g. SVG or PNG) in the right panel, then replace `public/govtech-logo.svg` with the exported file.
- **Hero**: `public/hero-illustration.svg`. Export from Figma and replace if you want the exact illustration.
