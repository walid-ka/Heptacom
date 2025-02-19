import { ReactNode } from "react";

type TableHeaderProps = {
    children: ReactNode;
};

const TableHeader = ({ children }: TableHeaderProps) => {
    return (
        <th className="border-b border-gray-600/50 px-4 py-4 text-left text-md">
            {children}
        </th>
    );
};

export default TableHeader;
