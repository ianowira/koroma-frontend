<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Agent Instructions: Tailwind Design Tokenization

## Color & Styling Rule (STRICT)
All AI agents working on this frontend codebase **MUST** follow the design tokens registered in `src/app/globals.css` and documented in [`docs/COLOR_SYSTEM.md`](./docs/COLOR_SYSTEM.md).

### Mandatory Directives
1. **Zero Arbitrary Colors**: NEVER use arbitrary hex or rgba values in component code (e.g. DO NOT USE `bg-[#00C896]`, `text-[#2D6A4F]`, `border-[#...]`).
2. **Zero Inline Color Styles**: NEVER use inline style objects for colors or background fills (e.g. DO NOT USE `style={{ color: 'var(--text-primary)' }}` or `style={{ background: 'var(--bg-card)' }}`).
3. **Zero Imperative Hover Handlers**: NEVER write DOM event listeners to manipulate style properties on hover (e.g. DO NOT USE `onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}`). Use declarative Tailwind hover modifiers (e.g. `text-muted hover:text-accent transition-colors`).
4. **Use Semantic Tokens**:
   - **Surfaces**: `bg-page`, `bg-card`, `bg-card-hover`, `bg-section-alt`, `bg-footer`, `bg-input`, `bg-pill`, `bg-stat-card`, `bg-info-card`, `bg-outcome`, `bg-botanical-icon`, `bg-filter-active`, `bg-cta-link`.
   - **Text**: `text-primary`, `text-secondary`, `text-muted`, `text-subtle`, `text-on-accent`.
   - **Brand / Accent**: `bg-accent`, `text-accent`, `bg-accent-hover`, `text-accent-light`, `bg-accent-bg`, `bg-accent-btn`, `bg-accent-btn-hover`.
   - **Certifications / Gold**: `text-gold`, `bg-gold`, `text-gold-text`, `bg-gold-bg`, `bg-cert-sabs`, `bg-cert-sahpra`.
   - **Borders**: `border-border`, `border-border-hover`, `border-border-accent`, `border-border-input`, `border-border-outcome`, `border-border-filter-active`, `border-border-dashed`, `border-border-cta-link`.
   - **Elevation**: `shadow-card`, `shadow-card-hover`, `shadow-accent`, `shadow-accent-lg`.

