import React from 'react';

interface TableWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ children, isLoading }) => {
  return (
    <div className="grid grid-cols-[50px_1fr_150px_100px_1fr] gap-4 w-full">
      {children}
    </div>
  );
};

export default TableWrapper;