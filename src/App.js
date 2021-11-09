import React, { useState, useEffect } from "react";
import "./styles.css";
import ListingReactTable from "./ListingReactTable";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import _ from "lodash";
import AlertStatusDropdown from "./AlertStatusDropdown";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/core";
import { useDisclosure } from "@chakra-ui/core";

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [showAddUserFlyMenu, setShowAddUserFlyMenu] = useState(false);
  const [showEditUserFlyMenu, setShowEditUserFlyMenu] = useState(false);

  const openAddUserFlyMenu = () => setShowAddUserFlyMenu(true);
  const closeAddUserFlymenu = () => setShowAddUserFlyMenu(false);

  const openEditUserFlyMenu = () => setShowEditUserFlyMenu(true);
  const closeEditUserFlyMenu = () => setShowEditUserFlyMenu(false);

  const onClickRow = (cell) => {
    // console.log("dropdown", cell.column.id);
    setRowData(cell.row.original);
    openEditUserFlyMenu();
  };

  const updateListFromAddFlyMenu = (user) => {
    setTableData([...tableData, user]);
  };

  const updateListFromEditFlymenu = (data) => {
    let index = _.findIndex(tableData, {
      id: data.id
    });
    let newData = { ...tableData[index] };
    newData = { ...newData, ...data };
    let newTableData = [...tableData];
    newTableData[index] = newData;
    setTableData(newTableData);
  };

  const userData = [
    {
      item: "Login Failed",
      status: ["open", "closed", "resolved", "acknowldged", "suppressed"],
      severity: "Medium",
      id: 1,
      timedata: "1 day ago",
      deviceType: "Water meter",
      deviceName: "Device XYZ"
    },
    {
      item: "Device Unhealthy",
      severity: "Urgent",
      status: ["open", "closed", "resolved", "acknowldged", "suppressed"],
      id: 2,
      timedata: "3 days ago",
      deviceType: "Power meter",
      deviceName: "Device ABC"
    }
  ];

  const columns = [
    {
      Header: "Item",
      accessor: "item" // accessor is the "key" in the data
    },

    {
      Header: "Status",
      accessor: "status",
      style: { overflow: "visible" },
      Cell: () => {
        return <AlertStatusDropdown />;
      }
    },
    {
      Header: "Severity",
      accessor: "severity"
    },
    {
      Header: "Time Data",
      accessor: "timedata"
    },
    {
      Header: "Device Type",
      accessor: "deviceType"
    },
    {
      Header: "Device Name",
      accessor: "deviceName"
    }
  ];

  useEffect(() => {
    //api call
    setTableData(userData);
  }, []);

  return (
    <div className="App">
      <div className="addUser">
        <button className="addUserButton" onClick={openAddUserFlyMenu}>
          Add User
        </button>
      </div>
      <ListingReactTable
        columns={columns}
        data={tableData}
        onClickRow={(row) => onClickRow(row)}
      />
      {showEditUserFlyMenu && (
        <EditUser
          showEditUserFlyMenu={showEditUserFlyMenu}
          setShowEditUserFlyMenu={setShowEditUserFlyMenu}
          closeFlyMenu={closeEditUserFlyMenu}
          user={rowData}
          updateListFromEditFlymenu={updateListFromEditFlymenu}
        />
      )}
      {showAddUserFlyMenu && (
        <AddUser
          showAddUserFlyMenu={showAddUserFlyMenu}
          setShowAddUserFlyMenu={setShowAddUserFlyMenu}
          closeAddUserFlyMenu={closeAddUserFlymenu}
          updateListFromAddFlyMenu={updateListFromAddFlyMenu}
        />
      )}
    </div>
  );
}
