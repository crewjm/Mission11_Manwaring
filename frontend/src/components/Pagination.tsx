interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    sortOrder: string;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onSortOrderChange: (order: string) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, sortOrder, onPageChange, onPageSizeChange, onSortOrderChange}: PaginationProps) => {
    return(
        <div>
            <button disabled={currentPage === 1} 
            onClick={() => onPageChange(currentPage - 1)} >Previous</button>

            {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === (i + 1)}>
                        {i + 1}
                    </button>
                ))
            }

            <button disabled={currentPage === totalPages} 
            onClick={() => onPageChange(currentPage + 1)}>Next</button>

            <br />
            <label>
            Sort by:
            <select
                className="form-select w-auto d-inline-block"
                value={sortOrder}
                onChange={(e) => {
                onSortOrderChange(e.target.value);
                onPageChange(1);
                }}
            >
                <option value="AllBooks">Unsorted</option>
                <option value="BooksAsc">A-Z</option>
                <option value="BooksDesc">Z-A</option>
            </select>
            </label>

            <br />
            <label>
                Results per page:
                <select 
                    value={pageSize} 
                    onChange={(p) => {onPageSizeChange(Number(p.target.value));
                    onPageChange(1);
                    }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </div>
    );
}

export default Pagination;