import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Images, Video, Music2, FileText, Search, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------------------------- Data ---------------------------------- */
const MEDIA_TYPES = ["All", "Image", "Video", "Audio", "Illustration", "Document"];

const MEDIA_ITEMS = [
    // Images
    {
        id: 1,
        title: "Sunlit Geometry",
        type: "Image",
        tags: ["Design", "Inspiration", "Architecture"],
        date: "Dec 1, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
    },
    {
        id: 2,
        title: "Muted Tones Study",
        type: "Image",
        tags: ["Color", "UX"],
        date: "Nov 18, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&h=600&fit=crop",
    },
    // Videos
    {
        id: 3,
        title: "Motion Principles Reel",
        type: "Video",
        tags: ["Motion", "Animation", "UX"],
        date: "Nov 5, 2024",
        duration: "1:12",
        // Using an image placeholder as thumb; in real app use CDN poster frame
        src: "https://videos.pexels.com/video-files/856193/856193-uhd_2560_1440_25fps.mp4",
        thumb: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    },
    // Audio
    {
        id: 4,
        title: "Ambient Loop 01",
        type: "Audio",
        tags: ["Sound", "Brand"],
        date: "Oct 28, 2024",
        duration: "0:42",
        src: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
        thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    },
    // Illustrations
    {
        id: 5,
        title: "System Icons Set",
        type: "Illustration",
        tags: ["Icons", "Systems", "Design"],
        date: "Oct 20, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=600&fit=crop",
    },
    // Documents
    {
        id: 6,
        title: "Design Tokens Spec.pdf",
        type: "Document",
        tags: ["Tokens", "Spec", "Best Practices"],
        date: "Oct 12, 2024",
        duration: null,
        src: "#",
        thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    },
    // More examples to fill a grid
    {
        id: 7,
        title: "Grid Rhythm",
        type: "Image",
        tags: ["Layout", "CSS"],
        date: "Sep 25, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    },
    {
        id: 8,
        title: "Reflections",
        type: "Image",
        tags: ["Photography", "Mood"],
        date: "Sep 14, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    },
    {
        id: 9,
        title: "Prototype Walkthrough",
        type: "Video",
        tags: ["Prototype", "React"],
        date: "Aug 30, 2024",
        duration: "2:31",
        src: "https://videos.pexels.com/video-files/1580508/1580508-uhd_2560_1440_30fps.mp4",
        thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    },
    {
        id: 10,
        title: "Brand Stems",
        type: "Audio",
        tags: ["Brand", "Audio"],
        date: "Aug 20, 2024",
        duration: "1:05",
        src: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
        thumb: "https://images.unsplash.com/photo-1513863321567-6a6a56a36e48?w=800&h=600&fit=crop",
    },
    {
        id: 11,
        title: "Palette Boards",
        type: "Illustration",
        tags: ["Color", "Inspiration"],
        date: "Jul 30, 2024",
        duration: null,
        src: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?w=1200&h=800&fit=crop",
        thumb: "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?w=800&h=600&fit=crop",
    },
    {
        id: 12,
        title: "Grid Cheatsheet.pdf",
        type: "Document",
        tags: ["CSS Grid", "Reference"],
        date: "Jul 10, 2024",
        duration: null,
        src: "#",
        thumb: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
    },
];



/* ------------------------------- Utilities -------------------------------- */
const iconForType = (type) => {
    switch (type) {
        case "Image": return Images;
        case "Video": return Video;
        case "Audio": return Music2;
        case "Illustration": return Images;
        default: return FileText;
    }
};

const useDebouncedValue = (value, delay = 300) => {
    const [v, setV] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setV(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return v;
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

/* --------------------------------- Hero ----------------------------------- */
const GalleryHero = () => (
    <section className="relative pt-28 pb-10">
        <div className="absolute inset-0 -z-10">
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-b from-ambe[48;33;115;1518;2530tr-500/20 to-transparent" />
        </div>
        <div className="container mx-auto px-6 text-center">
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                <span className="text-white">Media </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Gallery</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Bộ sưu tập media phong cách Pinterest, bảng màu amber giống Blog.
            </p>
            <div className="flex justify-center gap-4 mt-4 mb-4">
                <Link
                    to="/"
                    className="
                    inline-block
                    min-w-[140px]
                    px-6 py-3
                    rounded-2xl
                    bg-gradient-to-r from-amber-500 to-amber-600
                    text-white font-semibold
                    shadow-lg
                    hover:shadow-amber-400/50
                    transition duration-300
                    "
                >
                    About Me
                </Link>

                <Link
                    to="/blog"
                    className="
                    inline-block
                    min-w-[140px]
                    px-6 py-3
                    rounded-2xl
                    bg-black
                    text-white font-semibold
                    shadow-lg
                    hover:shadow-amber-400/50
                    transition duration-300
                    shadow-amber-400/10
                    "
                >
                    Blog
                </Link>
            </div>

        </div>
    </section>
);

/* ---------------------------- Controls / Filters --------------------------- */
const FilterControls = ({ types, activeType, setActiveType, search, setSearch }) => (
    <div className="container mx-auto px-6 pb-6 flex flex-col gap-4">
        <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
                type="search"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-white/5 text-white placeholder-white/40 pl-11 pr-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            />
        </div>
        <div className="flex flex-wrap gap-2">
            {types.map((t) => (
                <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur transition-all ${activeType === t ? "bg-amber-400/20 border-amber-400/40 text-amber-300" : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-amber-300/40 hover:bg-amber-300/10"}`}
                >
                    {t}
                </button>
            ))}
        </div>
    </div>
);

/* --------------------------------- Card ----------------------------------- */
const MediaCard = ({ item }) => {
    const navigate = useNavigate();
    const Icon = iconForType(item.type);
    return (
        <motion.div variants={fadeUp} className="break-inside-avoid my-8 cursor-pointer group" onClick={() => navigate(`/media/${item.id}`)}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow hover:shadow-2xl transition">
                <img src={item.thumb} alt={item.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute bottom-3 right-3 bg-black/50 p-2 rounded-full">
                    <Icon className="w-4 h-4 text-white" />
                </div>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-amber-300">{item.title}</h3>
            <div className="flex items-center gap-3 text-xs text-white/60">
                <Calendar className="w-3.5 h-3.5" />{item.date}
                {item.duration && (<><Clock className="w-3.5 h-3.5" />{item.duration}</>)}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                        <Tag className="w-3 h-3" />{t}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

/* ---------------------------------- Grid ---------------------------------- */
const MasonryGrid = ({ items }) => (
    <div className="container mx-auto px-6 pb-16" style={{ columnCount: 3, columnGap: "1.5rem" }}>
        <AnimatePresence>
            {items.map((it) => (
                <MediaCard key={it.id} item={it} />
            ))}
        </AnimatePresence>
    </div>
);

/* --------------------------------- Page ----------------------------------- */
const Gallery = () => {
    const [params, setParams] = useSearchParams();
    const [activeType, setActiveType] = useState(params.get("type") || "All");
    const [query, setQuery] = useState(params.get("q") || "");
    const debounced = useDebouncedValue(query, 250);

    useEffect(() => {
        const next = new URLSearchParams();
        next.set("type", activeType);
        if (debounced) next.set("q", debounced);
        setParams(next, { replace: true });
    }, [activeType, debounced]);

    const types = useMemo(() => {
        const set = new Set(["All"]);
        MEDIA_ITEMS.forEach((m) => set.add(m.type));
        return MEDIA_TYPES.filter((t) => set.has(t));
    }, []);

    const filtered = useMemo(() => {
        let list = MEDIA_ITEMS;
        if (activeType !== "All") list = list.filter((i) => i.type === activeType);
        if (debounced) {
            const q = debounced.toLowerCase();
            list = list.filter((i) => i.title.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q)));
        }
        return list;
    }, [activeType, debounced]);

    return (
        <div className="min-h-screen text-white">
            <GalleryHero />
            <FilterControls types={types} activeType={activeType} setActiveType={setActiveType} search={query} setSearch={setQuery} />
            <MasonryGrid items={filtered} />
        </div>
    );
};

export default Gallery;
