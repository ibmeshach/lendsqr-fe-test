import { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter, Column } from "react-table";
import styles from "./Table.module.scss";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from "date-fns";

const searchKey = "";
const CustomHeader = ({ title }: { title: string }) => (
  <div className={styles.header}>
    {title} <IoFilterSharp cursor="pointer" />
  </div>
);

const calculateDisplayPages = (
  pageIndex: number,
  pageCount: number
): number[] => {
  const totalPagesToShow: number = 3;
  const pages: number[] = [];

  if (pageCount <= totalPagesToShow) {
    for (let i = 0; i < pageCount; i++) {
      pages.push(i);
    }
  } else {
    let startPage: number = Math.max(
      0,
      pageIndex - Math.floor(totalPagesToShow / 2)
    );
    let endPage: number = Math.min(
      pageCount - 1,
      startPage + totalPagesToShow - 1
    );

    if (endPage - startPage + 1 < totalPagesToShow) {
      startPage = Math.max(0, endPage - totalPagesToShow + 1);
    }

    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push(-1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) {
        pages.push(-1);
      }
      pages.push(pageCount - 1);
    }
  }

  return pages;
};

const Table = ({ data = [] }: TableProp) => {
  const [searchedData, setSearchedData] = useState<User[]>([]);

  useEffect(() => {
    let searchedDataCopy = [...data];

    if (searchKey !== "") {
      searchedDataCopy = searchedDataCopy.filter((data) =>
        data?.email?.includes(searchKey)
      );
    }
    setSearchedData(searchedDataCopy);
  }, [searchKey, data]);

  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: () => <CustomHeader title="Organization" />,
        accessor: "organization",
      },
      {
        Header: () => <CustomHeader title="Username" />,
        accessor: "username",
      },
      {
        Header: () => <CustomHeader title="Email" />,
        accessor: "email",
      },
      {
        Header: () => <CustomHeader title="Phone Number" />,
        accessor: "phoneNumber",
      },
      {
        Header: () => <CustomHeader title="Date Joined" />,
        accessor: "dateJoined",
        Cell: ({ value }: { value: string }) => {
          return format(new Date(value), "MMM d, yyyy hh:mm a");
        },
      },
      {
        Header: () => <CustomHeader title="Status" />,
        accessor: "status",
        Cell: ({ value }: { value: string }) => {
          if (value == "Inactive") {
            return (
              <span className={`${styles.status} ${styles.inactive}`}>
                {value}
              </span>
            );
          } else if (value == "Pending") {
            return (
              <span className={`${styles.status} ${styles.pending}`}>
                {value}
              </span>
            );
          } else if (value == "Blacklisted") {
            return (
              <span className={`${styles.status} ${styles.blacklisted}`}>
                {value}
              </span>
            );
          } else if (value == "Active") {
            return (
              <span className={`${styles.status} ${styles.active}`}>
                {value}
              </span>
            );
          } else {
            return value;
          }
        },
      },
      {
        Header: "",
        id: "action",
        Cell: ({ row }: { row: any }) => {
          console.log(row);
          return (
            <BsThreeDotsVertical color="#545F7D" size={18} onClick={() => {}} />
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  ) as any;

  const { pageIndex, pageSize } = state;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {searchedData.length === 0 ? (
          <div className={styles.noResult}>
            {searchKey ? (
              <p>{`No results for ${searchKey}`}</p>
            ) : (
              <p>No Data Yet</p>
            )}
          </div>
        ) : (
          <>
            <div className={styles.table}>
              <table cellPadding="0" cellSpacing="0" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row: any, rowIndex: number) => {
                    prepareRow(row);
                    const isLastRow = rowIndex === page.length - 1;
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              style={isLastRow ? { borderBottom: "none" } : {}}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {searchedData.length === 0 ? null : (
          <div className={styles.pagination}>
            <div className={styles.left}>
              <p>Showing</p>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <p>out of {data.length}</p>
            </div>
            <div className={styles.right}>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <AiOutlineLeft />
              </button>

              <div className={styles.pages}>
                {Array.from({ length: pageCount }, (_, i) => {
                  const displayPages = calculateDisplayPages(
                    pageIndex,
                    pageCount
                  );

                  if (displayPages.includes(i)) {
                    return (
                      <p
                        key={i}
                        onClick={() => gotoPage(i)}
                        className={pageIndex === i ? styles.currentPage : ""}
                      >
                        {i + 1}
                      </p>
                    );
                  } else if (i === 1 && !displayPages.includes(0)) {
                    return <p key={i}>...</p>;
                  } else if (
                    i === pageCount - 2 &&
                    !displayPages.includes(pageCount - 1)
                  ) {
                    return <p key={i}>...</p>;
                  }
                })}
              </div>

              <button onClick={() => nextPage()} disabled={!canNextPage}>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
