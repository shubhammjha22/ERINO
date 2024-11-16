import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

export default function ContactTable({
  contacts,
  onEdit,
  onDelete,
  sortBy,
  sortDirection,
  onSort,
  loading,
}) {
  const headers = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "jobTitle", label: "Job Title" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleContacts = React.useMemo(() => {
    return [...contacts].slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, contacts]);

  //   console.log("visible contacts - ", visibleContacts);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ key, label }) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={sortBy === key}
                    direction={sortBy === key ? sortDirection : "asc"}
                    onClick={() => onSort(key)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleContacts?.map((contact) => (
              <motion.tr
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                component={TableRow} // Integrate motion with TableRow
                className="MuiTableRow-hover" // Ensure Material-UI hover styles work
              >
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onEdit(contact.id)}
                    color="primary"
                  >
                    <Pencil size={18} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(contact.id)}
                    color="secondary"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
