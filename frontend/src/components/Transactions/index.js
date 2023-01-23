import * as React from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IosShareIcon from "@mui/icons-material/IosShare";
import { visuallyHidden } from "@mui/utils";
import { FlagIcon, Text, Row, TextRowTable } from "./styles";
import { Button } from "@mui/material";
import exportTransactions, { html } from "../../assets/report_transactions";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

import image from "../../assets/unknown.png";

function createData(id, created_at, goalsHome, goalsAway, score, match) {
  return {
    id,
    created_at,
    goalsHome,
    goalsAway,
    score,
    match,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Data",
  },
  {
    id: "goalsHome",
    numeric: false,
    disablePadding: false,
    label: "Time Mandante",
  },
  {
    id: "goalsAway",
    numeric: false,
    disablePadding: false,
    label: "Time Visitante",
  },
  {
    id: "score",
    numeric: true,
    disablePadding: false,
    label: "Score Obtido",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const theme = useContext(ThemeContext);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        "& th": {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Text>{headCell.label}</Text>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, transactions } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Selecionado(s)
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {" "}
          Transações
        </Typography>
      )}
      <Button
        variant="text"
        size="small"
        endIcon={<IosShareIcon />}
        onClick={() => {
          exportTransactions(transactions);
        }}
      >
        exportar
      </Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ transactions }) {
  let rows = [];
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  rows = transactions.map((transaction) => {
    return createData(
      transaction.id,
      new Date(transaction.created).toLocaleString("pt-BR"),
      transaction.goals_homeTeam,
      transaction.goals_awayTeam,
      transaction.calculed_score,
      transaction.match
    );
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, transaction) => {
    const selectedIndex = selected.indexOf(transaction.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, transaction.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDoubleClick = (event, transaction) => {
    let url_redirect = "/transactions/" + transaction.id;
    navigate(url_redirect);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    // add Box component with background color bg[10]
    <Box>
      <Paper
        sx={{
          bgcolor: theme.colors.bg_color[10],
          padding1: 1,
          color: theme.colors.text,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          transactions={transactions}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"small"}
            sx={{
              bgcolor: theme.colors.bg_color[10],
            }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              sx={{
                bgcolor: theme.colors.bg_color[10],
              }}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      onDoubleClick={(event) => handleDoubleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Text>{row.id}</Text>
                      </TableCell>
                      <TableCell align="center">
                        <Text>
                          {row.updated_at ? row.updated_at : row.created_at}
                        </Text>
                      </TableCell>
                      <TableCell align="center">
                        <Row>
                          {row.match.homeTeam.crest_path ? (
                            <FlagIcon src={row.match.homeTeam.crest_path} />
                          ) : (
                            <FlagIcon src={image} />
                          )}
                          <Text>
                            {row.match.homeTeam.name
                              ? row.match.homeTeam.name
                              : "Não definido"}
                          </Text>
                          <TextRowTable>{row.goalsHome}</TextRowTable>
                        </Row>
                      </TableCell>
                      <TableCell align="center">
                        <Row>
                          {row.match.awayTeam.crest_path ? (
                            <FlagIcon src={row.match.awayTeam.crest_path} />
                          ) : (
                            <FlagIcon src={image} />
                          )}
                          <Text>
                            {row.match.awayTeam.name
                              ? row.match.awayTeam.name
                              : "Não definido"}
                          </Text>
                          <TextRowTable>{row.goalsAway}</TextRowTable>
                        </Row>
                      </TableCell>
                      <TableCell align="center">
                        {<Text>{row.score}</Text>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 30 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
