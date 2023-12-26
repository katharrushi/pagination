import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "id", selector: "id", sortable: true },
  { name: "Name", selector: "name", sortable: true },
  { name: "Email", selector: "email", sortable: true },
  { name: "Username", selector: "username", sortable: true },
];

const TableExample = () => {
  const [globalFilterText, setGlobalFilterText] = useState("");
  const [data, setData] = useState([]);

  const handleGlobalFilter = (e) => {
    const value = e.target.value || '';
    setGlobalFilterText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error in fetch:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(globalFilterText.toLowerCase())
    );
  });

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleGlobalFilter}
          value={globalFilterText}
        />
      </div>
      <div>
        <DataTable
          title="Data Table"
          columns={columns}
          data={filteredData}
          pagination
          hightlightOnHover
          responsive
          paginationPerPage={7}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
        />
      </div>
    </>
  );
};

export default TableExample;
