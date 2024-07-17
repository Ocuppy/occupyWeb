import { MONTHS } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePageArray(totalPages: number) {
  const pageArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(i);
  }

  return pageArray;
}

export const getVisiblePages = (
  showFullPagination: boolean,
  currentPage: number,
  totalPages: number
) => {
  if (showFullPagination || totalPages <= 3) {
    return generatePageArray(totalPages);
  }

  const pages = [];
  if (currentPage > 2) {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  if (currentPage === 1) {
    pages.unshift(1);
  }

  if (currentPage === totalPages) {
    pages.push(totalPages);
  }

  return pages;
};

export const removeSpaceAddUnderscore = (value: string) => {
  return value.toLowerCase().split(" ").join("_");
};

export const addSpaceRemoveUnderscore = (value: string) => {
  const newVal =
    value.toLowerCase().replace("_", " ").charAt(0).toUpperCase() +
    value.replace("_", " ").slice(1);

  return newVal;
};

export const months = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
};
