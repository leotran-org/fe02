import { Images, Video as VideoIcon, Music2, FileText } from "lucide-react";

export const iconForType = (type) => {
  switch (type) {
    case "Image":
    case "Illustration":
      return Images;
    case "Video":
      return VideoIcon;
    case "Audio":
      return Music2;
    default:
      return FileText;
  }
};

