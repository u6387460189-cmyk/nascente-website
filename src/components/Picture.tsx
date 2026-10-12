/**
 * Responsive scene photo: landscape crop on wide screens, portrait crop on
 * tall ones. Files come from `npm run images` (public/images/<scene>-{l,p}-<w>.webp).
 */
export function Picture({
  scene,
  alt,
  className,
  portrait = true,
  eager = false,
}: {
  scene: string;
  alt: string;
  className?: string;
  /** false when the scene has no portrait crop */
  portrait?: boolean;
  eager?: boolean;
}) {
  const l = `/images/${scene}-l-1200.webp 1200w, /images/${scene}-l-1920.webp 1920w`;
  const p = `/images/${scene}-p-720.webp 720w, /images/${scene}-p-1080.webp 1080w`;
  return (
    <picture className={className}>
      {portrait && <source media="(max-aspect-ratio: 1/1)" srcSet={p} sizes="100vw" />}
      <source srcSet={l} sizes="100vw" />
      <img
        src={`/images/${scene}-l-1920.webp`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
