"use client";

import type { HTMLAttributes } from "react";
import { InfoRow } from "@/components/molecules/InfoRow";
import { cn } from "@/components/utils/cn";
import { SectionLayout } from "@/components/organisms/SectionLayout";

export type CompanySectionProps = {
  companyInfo: Array<{ label: string; value: string }>;
  mapUrl: string;
} & HTMLAttributes<HTMLElement>;

export function CompanySection({ companyInfo, mapUrl, className, ...rest }: CompanySectionProps) {
  return (
    <SectionLayout
      title="COMPANY"
      id="company"
      className={cn("py-16", className)}
      innerClassName="max-w-4xl"
      contentClassName="mt-8 space-y-10"
      {...rest}
    >
      <div className="md:mx-16 ">
        <div className={cn("md:grid md:grid-cols-8", `md:grid-rows-${companyInfo.length}`)}>
          {companyInfo.map((item, index) => (
            <div className="md:col-start-2 md:col-span-6" key={`${item.label}-wrapper-${index}`}>
              <InfoRow
                key={`${item.label}-${index}`}
                label={item.label}
                value={item.value}
                noBorder={index === companyInfo.length - 1}
                labelClassName="text-md text-gray-500 mr-8 md:text-xl"
                valueClassName="flex-1 text-md font-medium text-black md:text-xl"
              />
            </div>
          ))}
        </div>

        <iframe
          title="Company location map"
          src={mapUrl}
          className="aspect-square sm:aspect-8/4 md:aspect-16/4 w-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </SectionLayout>
  );
}
