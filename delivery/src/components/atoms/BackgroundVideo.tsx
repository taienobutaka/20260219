import { SmartVideo } from "@/components/atoms/SmartVideo";
import { cn } from "@/components/utils/cn";

export type MovieType = "Base" | "HeroBase";

const movieMapper: { [key in MovieType]: string } = {
  Base: "bg.mp4",
  HeroBase: "opening_bg.mp4",
};

export default function BackgroundVideo({
  type = "Base",
  className = undefined,
}: {
  type?: MovieType;
  className?: string;
}) {
  const videoSrc = `/videos/${movieMapper[type]}`;

  return (
    <SmartVideo
      src={videoSrc}
      className={cn("absolute top-0 left-0 w-full h-full object-cover", className)}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
