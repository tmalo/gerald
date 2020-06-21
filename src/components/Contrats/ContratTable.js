import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { default as ContratItem } from "./ContratItem";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const ContratTable = (props) => {
  const {
    className,
    contrats,
    // eslint-disable-next-line no-unused-vars
    staticContext,
    ...rest
  } = props;
  const classes = useStyles();
  const { history } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => {
              history.push("/add-contrat");
            }}
          >
            Nouveau contrat
          </Button>
        }
        title="Contrats"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell align="center">Type contrat</TableCell>
                  <TableCell>Lancé le</TableCell>
                  <TableCell align="center">nb Sites</TableCell>
                  <TableCell align="center">nb Usagers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contrats.map((item, i) => (
                  <ContratItem key={i} contrat={item} />
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contrats.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

ContratTable.propTypes = {
  className: PropTypes.string,
  staticContext: PropTypes.any,
  contrats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      societe: PropTypes.string,
      type_contrat: PropTypes.string,
      date_lancement: PropTypes.string,
      nb_usagers: PropTypes.exact({
        count: PropTypes.number,
      }),
      nb_sites: PropTypes.exact({
        count: PropTypes.number,
      }),
    })
  ).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ContratTable);
