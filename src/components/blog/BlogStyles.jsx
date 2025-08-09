export const BlogStyles = () => (
  <style>{`
    .animated-underline{position:relative}
    .animated-underline::after{content:'';position:absolute;left:0;bottom:-2px;height:2px;width:0;background:linear-gradient(90deg,#fbbf24,#fde68a,#f59e0b);transition:width .4s cubic-bezier(.2,.8,.2,1)}
    .group:hover .animated-underline::after{width:100%}
    .glass-card:focus-within, .glass-card:focus{outline:2px solid rgba(245,158,11,.5);outline-offset:2px}
  `}</style>
);
