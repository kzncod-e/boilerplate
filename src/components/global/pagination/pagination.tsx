import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  size?: "default" | "small";
  showTotalItems?: boolean;
  disabled?: boolean;
}

export default function NewsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange = () => {},
  size = "default",
  showTotalItems = true,
  disabled = false,
}: PaginationProps) {
  // Calculate default values based on provided props
  const calculatedTotalItems = totalItems ?? 50; // Default 50 items
  const calculatedItemsPerPage = itemsPerPage;
  const calculatedTotalPages =
    totalPages ?? Math.ceil(calculatedTotalItems / calculatedItemsPerPage);
  const calculatedCurrentPage = currentPage ?? 1;
  const hasPages = calculatedTotalPages > 0 && calculatedTotalItems > 0;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 3;

    if (calculatedTotalPages <= maxVisiblePages) {
      // If total pages is 3 or less, show all pages
      for (let i = 1; i <= calculatedTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // For current page 1, show 1,2,3
      if (calculatedCurrentPage <= 1) {
        pages.push(1, 2, 3);
      }
      // For last page, show last-2, last-1, last
      else if (calculatedCurrentPage >= calculatedTotalPages) {
        pages.push(
          calculatedTotalPages - 2,
          calculatedTotalPages - 1,
          calculatedTotalPages,
        );
      }
      // For middle pages, show current-1, current, current+1
      else {
        pages.push(
          calculatedCurrentPage - 1,
          calculatedCurrentPage,
          calculatedCurrentPage + 1,
        );
      }
    }

    return pages;
  };

  const textSize = size === "small" ? "text-xs" : "text-sm";
  const buttonSize = size === "small" ? "h-6" : "h-8";
  const buttonWidth = size === "small" ? "w-6" : "w-8";
  const containerGap = size === "small" ? "gap-1" : "gap-2";
  const buttonTextSize = size === "small" ? "text-[11px]" : "text-xs";

  return (
    <div className={`flex flex-col items-center ${containerGap}`}>
      {showTotalItems && (
        <p className={`${textSize} text-muted-foreground`}>
          {hasPages
            ? `${
                (calculatedCurrentPage - 1) * calculatedItemsPerPage + 1
              } - ${Math.min(
                calculatedCurrentPage * calculatedItemsPerPage,
                calculatedTotalItems,
              )} dari ${calculatedTotalItems} Data`
            : `0 - 0 dari ${calculatedTotalItems ?? 0} Data`}
        </p>
      )}

      <div
        className={`flex items-center w-full justify-center ${containerGap} pt-1 ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        {/* First page button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} !px-1 ${buttonTextSize} text-primary`}
          disabled={disabled || !hasPages || calculatedCurrentPage === 1}
          onClick={() => !disabled && hasPages && onPageChange(1)}
        >
          <ChevronsLeft />
        </Button>

        {/* Previous button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} px-2 ${buttonTextSize} text-primary hidden md:inline-flex`}
          disabled={disabled || !hasPages || calculatedCurrentPage === 1}
          onClick={() =>
            !disabled && hasPages && onPageChange(calculatedCurrentPage - 1)
          }
        >
          Sebelumnya
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} px-2 ${buttonTextSize} text-primary md:hidden`}
          disabled={disabled || !hasPages || calculatedCurrentPage === 1}
          onClick={() =>
            !disabled && hasPages && onPageChange(calculatedCurrentPage - 1)
          }
        >
          <ChevronLeft />
        </Button>

        {/* Page number buttons */}
        {hasPages &&
          getPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={
                calculatedCurrentPage === pageNumber ? "outline" : "ghost"
              }
              size="sm"
              className={`${buttonSize} ${buttonWidth} px-0 ${buttonTextSize} ${
                calculatedCurrentPage === pageNumber
                  ? "border-primary/50 bg-primary/10"
                  : ""
              }`}
              disabled={disabled}
              onClick={() => !disabled && hasPages && onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

        {/* Next button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} px-2 ${buttonTextSize} text-primary hidden md:inline-flex`}
          disabled={
            disabled ||
            !hasPages ||
            calculatedCurrentPage === calculatedTotalPages
          }
          onClick={() =>
            !disabled && hasPages && onPageChange(calculatedCurrentPage + 1)
          }
        >
          Selanjutnya
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} px-2 ${buttonTextSize} text-primary md:hidden`}
          disabled={
            disabled ||
            !hasPages ||
            calculatedCurrentPage === calculatedTotalPages
          }
          onClick={() =>
            !disabled && hasPages && onPageChange(calculatedCurrentPage + 1)
          }
        >
          <ChevronRight />
        </Button>

        {/* Last page button */}
        <Button
          variant="ghost"
          size="sm"
          className={`${buttonSize} !px-1 ${buttonTextSize} text-primary`}
          disabled={
            disabled ||
            !hasPages ||
            calculatedCurrentPage === calculatedTotalPages
          }
          onClick={() =>
            !disabled && hasPages && onPageChange(calculatedTotalPages)
          }
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
