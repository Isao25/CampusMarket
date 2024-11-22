import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export interface IPaginationProps{
    currentPage: number,
    totalPages: number,
    onPageChange:any,
    maxVisiblePages:number
}

export const PaginationComp = ({
    currentPage = 1,
    totalPages,
    onPageChange,
    maxVisiblePages = 5
}: IPaginationProps) => {
    
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {/* Botón de "Página Anterior" */}
                <PaginationItem >
                    <PaginationPrevious 
                        isActive={!(currentPage === 1)}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                    />
                </PaginationItem>

                {/* Botones de páginas dinámicos */}
                {pages.map((page) => (
                    <PaginationItem key={page} >
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Botón de "Página Siguiente" */}
                <PaginationItem >
                    <PaginationNext
                        isActive={!(currentPage === totalPages)}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};