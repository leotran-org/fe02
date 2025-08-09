const MOCK_POSTS = [
  {
    id: 1,
    title: "The Art of Minimalistic Design in Modern Web Development",
    excerpt:
      "Exploring how less can be more when it comes to creating engaging user experiences that truly matter.",
    categories: ["Design", "UX", "Inspiration"],
    readTime: "5 min read",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop",
    author: {
      name: "Avery Stone",
      role: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
    },
    htmlContent: [
      `<p class="text-white/80 leading-relaxed mb-5">Minimalism in UI isn’t about removing features; it’s about removing friction. The details that remain should earn their spot.</p>`,
      `<h2 class="text-2xl md:text-3xl font-bold mt-10 mb-4">Why minimalism still matters</h2>`,
      `<p class="text-white/80 leading-relaxed mb-5">As design systems mature, bloat sneaks in. A minimal approach helps teams prioritize clarity, performance, and accessibility.</p>`,
      `<ul class="list-disc list-inside space-y-2 text-white/80 mb-6">
        <li>Reduce cognitive load with clear hierarchy.</li>
        <li>Use motion sparingly to guide attention.</li>
        <li>Design with constraints to ship faster.</li>
      </ul>`,
      `<figure class="border-l-4 border-amber-400 pl-5 my-8">
        <blockquote class="italic text-white/80">“Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.”</blockquote>
        <figcaption class="mt-2 text-white/50">— Antoine de Saint-Exupéry</figcaption>
      </figure>`,
      `<h2 class="text-2xl md:text-3xl font-bold mt-10 mb-4">Practical tips</h2>`,
      `<p class="text-white/80 leading-relaxed mb-5">Start with typography and spacing. Pick one highlight color (here: amber) and let neutrals do the heavy lifting.</p>`,
      `<figure class="my-8">
        <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1600&h=900&fit=crop" alt="Clean desk setup with minimal layout sketches" class="rounded-xl w-full object-cover" />
        <figcaption class="text-sm text-white/60 mt-2">Keep artifacts simple. Complexity lives in the system, not the surface.</figcaption>
      </figure>`,
    ],
  },
  {
    id: 2,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "A deep dive into architectural patterns and best practices for maintainable React codebases.",
    categories: ["Development", "TypeScript", "Best Practices"],
    readTime: "8 min read",
    date: "Dec 10, 2024",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop",
    author: {
      name: "Kai Nguyen",
      role: "Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop",
    },
    htmlContent: [
      `<p class="text-white/80 leading-relaxed mb-5">Type inference is your friend—until it isn't. Add types where contracts matter.</p>`,
      `<h2 class="text-2xl md:text-3xl font-bold mt-10 mb-4">Folder-by-feature &gt; folder-by-type</h2>`,
      `<p class="text-white/80 leading-relaxed mb-5">Group UI, hooks, and tests by feature to reduce cross-module chaos.</p>`,
      `<ul class="list-disc list-inside space-y-2 text-white/80 mb-6">
        <li>Treat components as state machines.</li>
        <li>Prefer composition over inheritance.</li>
        <li>Document public APIs.</li>
      </ul>`,
    ],
  },
];

export default MOCK_POSTS;
