"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/atoms/LinkButton";

type ServicesCardButtonsProps = {
  buttons: Array<{ label?: string; href: string }>;
};

export function ServicesCardButtons({ buttons }: ServicesCardButtonsProps) {
  const router = useRouter();

  const handleClick = (href: string) => {
    if (!href) return;
    if (href.startsWith("http")) {
      window.location.href = href;
      return;
    }
    router.push(href);
  };

  return (
    <div className="absolute bottom-4 left-2 z-10 flex w-[40vw] flex-col md:bottom-8 md:left-12">
      {buttons.map((button, index) => (
        <LinkButton
          key={`${button.href}-${index}`}
          text={button.label ?? "View More"}
          onClick={() => handleClick(button.href)}
          textColorClassName="text-white"
        />
      ))}
    </div>
  );
}
