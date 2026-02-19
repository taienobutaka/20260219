import HPLogo from "@/assets/HP.svg";
import { cn } from "@/components/utils/cn";

export default function Logo({ className }: { className?: string }) {
  return <HPLogo className={cn("h-full", className)} />;
}
