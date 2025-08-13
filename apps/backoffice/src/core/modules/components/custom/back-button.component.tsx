"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Iconify from "./iconify.component";
import { Button } from "@nine-line/ui";
import { H2 } from "@nine-line/ui";

interface BackButtonProps {
  className?: string;
  text?: string;
}

export const BackButton = ({ className, text }: BackButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Button
        size={"icon"}
        onClick={router.back}
        aria-label="Voltar"
        className={twMerge("min-w-[40px]", className)}
      >
        <span className="sr-only">back button</span>
        <Iconify icon={ChevronLeftIcon} aria-hidden="true" />
        {text && <H2 className="hidden md:block">{text}</H2>}
      </Button>
    </div>
  );
};
