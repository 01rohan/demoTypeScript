import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { RootState } from "../redux/store";

const UserTable: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  console.log(userData, "userData");

  // If userData is empty, create a dummy data structure
  const dummyData = [
    { name: "", age: "", sex: "", mobile: "", govid: "" },
    // { name: "Jane", age: "25", gender: "Female" },
    // Add more dummy data items as needed
  ];

  // Use userData if available, otherwise use the dummyData
  const fields = Object.keys(userData[0] || dummyData[0]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell key={index}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(userData.length ? userData : dummyData).map((data, dataIndex) => (
              <TableRow key={dataIndex}>
                {fields.map((field, fieldIndex) => (
                  <TableCell key={fieldIndex}>
                    {data[field] as string}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
