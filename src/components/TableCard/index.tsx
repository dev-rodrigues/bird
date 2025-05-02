import React from "react";

interface TableCardProps {
    children: React.ReactNode;
    className?: string;
}

const TableCard: React.FC<TableCardProps> = ({ children, className = "" }) => {
    return (
        <div className={`rounded-md border overflow-x-auto ${className}`}>
            <table className="w-full text-sm text-left">{children}</table>
        </div>
    );
};

export default TableCard;