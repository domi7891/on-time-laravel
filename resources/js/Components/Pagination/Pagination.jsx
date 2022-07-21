import React from "react";
import PaginateHeader from "./PaginateHeader";

function Pagination({ pagination, headerClassName, children }) {
    return (
        <div>
            <PaginateHeader
                className={headerClassName}
                pagination={pagination}
            />
            {children}
            <PaginateHeader
                className={headerClassName}
                pagination={pagination}
            />
        </div>
    );
}

export default Pagination;
