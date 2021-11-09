import React from "react";
import { useTable, useSortBy, useFlexLayout } from "react-table";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ListingReactTable = ({ columns, data, onClickRow }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false
    },

    useSortBy,
    useFlexLayout
  );
  return (
    <table {...getTableProps()} className="tableComponent">
      <thead className="theadComponent" {...getTableBodyProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="trComponent">
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="headercomponent"
              >
                <p className="pcomponent">
                  {column.render("Header")}
                  {!column.disableSortBy ? (
                    column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="sort_icon">
                          <FaCaretDown />
                        </span>
                      ) : (
                        <span className="sort_icon">
                          <FaCaretUp />
                        </span>
                      )
                    ) : (
                      <span className="sort_icon sortable">
                        <FaCaretUp />
                        <FaCaretDown />
                      </span>
                    )
                  ) : null}
                </p>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bodyComponent">
        {rows.map((row, index) => {
          prepareRow(row);
          if (data.length === index + 1) {
            return (
              <tr {...row.getRowProps()} className="bodyTr">
                {row.cells.map((cell) => {
                  return (
                    <div>
                      <td
                        {...cell.getCellProps()}
                        onClick={() => {
                          onClickRow(cell);
                        }}
                        className="tdcomponent"
                      >
                        <p>
                          {cell.column.Header === "#"
                            ? index + 1
                            : cell.render("Cell")}
                        </p>
                      </td>
                    </div>
                  );
                })}
              </tr>
            );
          } else {
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={cell.column.id}
                      {...cell.getCellProps()}
                      onClick={() => {
                        onClickRow(cell);
                      }}
                    >
                      <p>
                        {cell.column.Header === "#"
                          ? index + 1
                          : cell.render("Cell")}
                      </p>
                    </td>
                  );
                })}
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};
export default ListingReactTable;
