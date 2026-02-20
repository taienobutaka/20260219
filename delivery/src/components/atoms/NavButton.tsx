import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/components/utils/cn";

export type NavButtonProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  iconClassName?: string;
};

export default function NavButton({ open, setOpen, className, iconClassName }: NavButtonProps) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn("p-2 rounded-4xl bg-white/60 ripple ripple-black", className)}
    >
      {open ? (
        <XMarkIcon className={cn("w-6 h-6 text-gray-800", iconClassName)} />
      ) : (
        <Bars3Icon className={cn("w-6 h-6 text-gray-800", iconClassName)} />
      )}
    </button>
  );
}
