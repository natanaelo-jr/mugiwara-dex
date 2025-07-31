import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  current,
  total,
  onChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start"); // Representa o ellipsis no início
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < total) {
      if (endPage < total - 1) {
        pageNumbers.push("ellipsis-end"); // Representa o ellipsis no final
      }
      pageNumbers.push(total);
    }
    return pageNumbers.map((pageNumber, index) => (
      <PaginationItem key={index}>
        {" "}
        {/* Usar index como key é ok aqui pois a lista é estável */}
        {pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end" ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            onClick={() => onChange(pageNumber as number)}
            isActive={pageNumber === current}
          >
            {pageNumber}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChange(current - 1)}
              aria-disabled={current === 1} // Desabilita se for a primeira página
              disabled={current === 1}
            />
          </PaginationItem>
          {renderPageNumbers()}{" "}
          {/* Renderiza os números das páginas e elipses */}
          <PaginationItem>
            <PaginationNext
              onClick={() => onChange(current + 1)}
              aria-disabled={current === total} // Desabilita se for a última página
              disabled={current === total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationComponent;
