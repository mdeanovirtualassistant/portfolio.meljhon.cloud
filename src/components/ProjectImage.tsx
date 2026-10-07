import { useState } from "react";
import { FolderKanban } from "lucide-react";

/** Shows a project screenshot, or a tidy placeholder if the image cannot be loaded. */
const ProjectImage = ({ src, alt, className, lazy = false }: { src: string; alt: string; className: string; lazy?: boolean }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span role="img" aria-label={alt} className="flex h-full min-h-32 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <FolderKanban className="h-8 w-8" />
      </span>
    );
  }
  return <img src={src} alt={alt} loading={lazy ? "lazy" : undefined} decoding="async" onError={() => setFailed(true)} className={className} />;
};

export default ProjectImage;
