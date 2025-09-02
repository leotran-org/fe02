import {
  ArrowLeft,
  Eye,
  Pencil,
  Plus,
  Save,
  UploadCloud,
  Trash2,
  Layers,
  Type,
  Image as ImageIcon,
  Quote,
  Code,
  List as ListIcon,
  Columns3,
  Video,
  HelpCircle,
  Sparkles,
  BadgePlus,
  Check,
  X,
} from "lucide-react";

const TEMPLATES = [
  {
    key: "heading",
    label: "Heading",
    icon: Type,
    html: `<h2 class="mt-8 mb-2 text-2xl font-bold">Your awesome section title</h2>`
  },
  {
    key: "paragraph",
    label: "Paragraph",
    icon: Pencil,
    html: `<p class="text-white/90 leading-relaxed">Write a clear, concise paragraph that tells your story and adds value to your readers. Keep sentences short and purposeful.</p>`
  },
  {
    key: "image",
    label: "Image",
    icon: ImageIcon,
    html: `<figure class="my-6"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200" alt="Alt text" class="rounded-xl w-full object-cover"/><figcaption class="text-sm text-white/60 mt-2">An evocative caption.</figcaption></figure>`
  },
  {
    key: "quote",
    label: "Quote",
    icon: Quote,
    html: `<blockquote class="border-l-4 border-amber-300/60 pl-4 italic text-white/90">“A strong quote anchors a section and guides the reader.”</blockquote>`
  },
  {
    key: "callout",
    label: "Callout",
    icon: Sparkles,
    html: `<div class="rounded-xl border border-amber-300/30 bg-amber-300/10 p-4"><strong class="text-amber-300">Pro tip:</strong> Add a short, actionable insight here.</div>`
  },
  {
    key: "list",
    label: "List",
    icon: ListIcon,
    html: `<ul class="list-disc pl-6 space-y-1"><li>Point one</li><li>Point two</li><li>Point three</li></ul>`
  },
  {
    key: "code",
    label: "Code",
    icon: Code,
    html: `<pre class="rounded-xl bg-white/5 border border-white/10 p-4 overflow-auto"><code>// paste code here\nfunction greet(name){\n  return \`Hello, ${"${name}"}!\`;\n}</code></pre>`
  },
  {
    key: "two-col",
    label: "Two Columns",
    icon: Columns3,
    html: `<div class="grid md:grid-cols-2 gap-6 my-6"><div><h3 class="font-semibold mb-2">Left</h3><p>Supporting copy for the left column.</p></div><div><h3 class="font-semibold mb-2">Right</h3><p>Complementary copy for the right column.</p></div></div>`
  },
  {
    key: "cta",
    label: "CTA Box",
    icon: BadgePlus,
    html: `<div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-center my-6"><h3 class="text-xl font-semibold mb-2">Ready to get started?</h3><a href="#" class="inline-block px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold">Call to action</a></div>`
  },
  {
    key: "video",
    label: "Video Embed",
    icon: Video,
    html: `<div class="aspect-video rounded-xl overflow-hidden border border-white/10"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" allowfullscreen class="w-full h-full"></iframe></div>`
  },
  {
    key: "faq",
    label: "FAQ",
    icon: HelpCircle,
    html: `<details class="group rounded-xl border border-white/10 p-4"><summary class="cursor-pointer font-medium">What problem does this solve?</summary><p class="mt-2 text-white/80">A short, direct answer with an example.</p></details>`
  },
  {
    key: "hero",
    label: "Mini Hero",
    icon: Layers,
    html: `<section class="relative rounded-2xl overflow-hidden my-6"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600" alt="hero" class="w-full h-64 object-cover opacity-70"/><div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div class="absolute bottom-4 left-4"><h2 class="text-3xl font-bold">Section Hero</h2><p class="text-white/80">Optional kicker text.</p></div></section>`
  },
  {
    key: "stats",
    label: "Stats Row",
    icon: Check,
    html: `<div class="grid grid-cols-3 gap-4 text-center my-6"><div><div class="text-3xl font-bold">98%</div><div class="text-xs text-white/60">Satisfaction</div></div><div><div class="text-3xl font-bold">24k</div><div class="text-xs text-white/60">Readers</div></div><div><div class="text-3xl font-bold">3x</div><div class="text-xs text-white/60">Faster</div></div></div>`
  },
];

export default TEMPLATES;
