import { Images, Video, Music2, FileText } from "lucide-react";

export default function iconForType(type) {
  switch (type) {
    case "Image": return Images;
    case "Video": return Video;
    case "Audio": return Music2;
    case "Illustration": return Images;
    default: return FileText;
  }
}

