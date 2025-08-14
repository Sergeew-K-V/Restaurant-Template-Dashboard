import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...inputs: unknown[]) => {
  return twMerge(clsx(inputs));
};
