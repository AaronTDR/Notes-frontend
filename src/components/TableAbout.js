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
    color: "white",
    background: "black",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function TableAbout(props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>consectetur</StyledTableCell>
            <StyledTableCell>Duis rutrum</StyledTableCell>
            <StyledTableCell>eleifend</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((element) => (
            <TableRow key={element.id}>
              <TableCell>{element.tempus}</TableCell>
              <TableCell align="center">{element.tempor}</TableCell>
              <TableCell align="center">{element.scelerisque}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableAbout;
