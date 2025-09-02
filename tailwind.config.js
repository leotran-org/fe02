// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // typography & text colors/sizes
    { pattern: /^(prose|prose-invert)$/ },
    { pattern: /^text-(xs|sm|base|lg|xl|\\d{2}xl)$/ },
    { pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
    { pattern: /^leading-(none|tight|snug|normal|relaxed|loose|\\d+)$/ },
    { pattern: /^tracking-(-?\\w+)$/ },

    // spacing
    { pattern: /^(m|mx|my|mt|mr|mb|ml|p|px|py|pt|pr|pb|pl)-(\\d+|px)$/ },

    // colors (expand palettes you actually use)
    { pattern: /^(text|bg|border|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/ },

    // layout & decoration
    { pattern: /^(w|h|min-w|min-h|max-w|max-h)-(\\d+|px|full|screen)$/ },
    { pattern: /^(rounded|rounded-(sm|md|lg|xl|2xl|3xl|full))$/ },
    { pattern: /^(border|border-(0|2|4|8))$/ },
    { pattern: /^(shadow.*)$/ },
    { pattern: /^(list-disc|list-decimal|list-inside|list-outside)$/ },
    { pattern: /^(grid|grid-cols-\\d+|gap-\\d+)$/ },
    { pattern: /^(flex|inline-flex|items-\\w+|justify-\\w+|flex-\\w+)$/ },
    { pattern: /^(object-contain|object-cover|object-center)$/ },
    { pattern: /^underline|no-underline|italic|not-italic$/ },

    // any bespoke tokens you expect from the CMS:
    // "bg-amber-400", "border-l-4", "pl-5", ...
  ],
  plugins: [require("@tailwindcss/typography")],
};

