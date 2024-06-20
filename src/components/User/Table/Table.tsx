import { useContext, useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter, Column } from "react-table";
import styles from "./Table.module.scss";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from "date-fns";
import Filter from "../../Shared/Modals/Filter/Filter";
import { GeneralUserData } from "../../../context/UserDataContext";
import Options from "../../Shared/Modals/Options/Options";

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
  const { searchKey } = useContext(GeneralUserData);
  const [searchedData, setSearchedData] = useState<User[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<{
    state: boolean;
    index: string | null;
  }>({
    state: false,
    index: null,
  });
  const [filterData, setFilterData] = useState<FilterProps>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    let filteredData = [...data];

    // Filter logic
    if (filterData.organization) {
      filteredData = filteredData.filter((data) =>
        data.organization
          .toLowerCase()
          .includes(filterData.organization.toLowerCase())
      );
    }
    if (filterData.username) {
      filteredData = filteredData.filter((data) =>
        data.username.toLowerCase().includes(filterData.username.toLowerCase())
      );
    }
    if (filterData.email) {
      filteredData = filteredData.filter((data) =>
        data.email.toLowerCase().includes(filterData.email.toLowerCase())
      );
    }
    if (filterData.date) {
      filteredData = filteredData.filter(
        (data) =>
          format(new Date(data.dateJoined), "yyyy-MM-dd") === filterData.date
      );
    }
    if (filterData.phoneNumber) {
      filteredData = filteredData.filter((data) =>
        data.phoneNumber
          .toLowerCase()
          .includes(filterData.phoneNumber.toLowerCase())
      );
    }
    if (filterData.status) {
      filteredData = filteredData.filter((data) =>
        data.status.toLowerCase().includes(filterData.status.toLowerCase())
      );
    }

    // Search logic
    if (searchKey) {
      filteredData = filteredData.filter(
        (data) =>
          data.email.toLowerCase().includes(searchKey.toLowerCase()) ||
          data.organization.toLowerCase().includes(searchKey.toLowerCase()) ||
          data.username.toLowerCase().includes(searchKey.toLowerCase()) ||
          data.phoneNumber.toLowerCase().includes(searchKey.toLowerCase()) ||
          data.status.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    setSearchedData(filteredData);
  }, [searchKey, filterData, data]);

  const CustomHeader = ({ title }: { title: string }) => (
    <>
      <div className={styles.header}>
        {title}{" "}
        <IoFilterSharp
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          cursor="pointer"
        />
      </div>

      {showFilter ? (
        <Filter
          onClose={() => {
            setShowFilter(false);
          }}
          setFilterData={setFilterData}
        />
      ) : null}
    </>
  );

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
          const statusStyles: { [key: string]: string } = {
            Inactive: styles.inactive,
            Pending: styles.pending,
            Blacklisted: styles.blacklisted,
            Active: styles.active,
          };
          return (
            <span className={`${styles.status} ${statusStyles[value] || ""}`}>
              {value}
            </span>
          );
        },
      },
      {
        Header: "",
        id: "action",
        Cell: ({ row }: { row: any }) => {
          const data: User = row.original;
          return (
            <>
              <BsThreeDotsVertical
                cursor="pointer"
                color="#545F7D"
                size={18}
                onClick={() => {
                  setShowOption((prev) => ({
                    state: prev.index !== data.id || !prev.state,
                    index: prev.index !== data.id ? data.id : null,
                  }));
                }}
              />
              {showOption.state && showOption.index === data.id ? (
                <Options
                  onClose={() => setShowOption({ state: false, index: null })}
                  data={data}
                />
              ) : null}
            </>
          );
        },
      },
    ],
    [showFilter, showOption]
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
      data: searchedData,
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
                  {headerGroups.map((headerGroup: any) => {
                    const { key: headerGroupKey, ...headerGroupProps } =
                      headerGroup.getHeaderGroupProps();
                    return (
                      <tr key={headerGroupKey} {...headerGroupProps}>
                        {headerGroup.headers.map((column: any) => {
                          const { key: columnKey, ...columnProps } =
                            column.getHeaderProps();
                          return (
                            <th key={columnKey} {...columnProps}>
                              {column.render("Header")}
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {page.map((row: any, rowIndex: number) => {
                    prepareRow(row);
                    const isLastRow = rowIndex === page.length - 1;
                    const { key: rowKey, ...rowProps } = row.getRowProps();

                    return (
                      <tr key={rowKey} {...rowProps}>
                        {row.cells.map((cell: any) => {
                          const { key: cellKey, ...cellProps } =
                            cell.getCellProps();
                          return (
                            <td
                              key={cellKey}
                              style={isLastRow ? { borderBottom: "none" } : {}}
                              {...cellProps}
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
