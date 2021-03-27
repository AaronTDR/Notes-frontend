import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles(() => ({
  head: {
    background: "black",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function ManageTable(props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Close date</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Priority</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((element) => (
            <TableRow key={element.id}>
              <TableCell>{element.date}</TableCell>
              <TableCell align="center">{element.title}</TableCell>
              <TableCell align="center">{element.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManageTable;
