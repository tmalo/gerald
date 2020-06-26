import React, { useState, useEffect } from "react";
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

import { default as DemandeItem } from "./DemandeItem";

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

const DemandeTable = (props) => {
  const {
    className,
    demandes,
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

  useEffect(() => {
    //To initialise:
    const container = document.querySelector("#table-content");
    const ps = new PerfectScrollbar(container); // eslint-disable-line no-unused-vars
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => {
              history.push("/add-demande");
            }}
          >
            Nouvelle demande
          </Button>
        }
        title="Mes Demandes"
      />
      <Divider />
      <CardContent className={classes.content}>
        <div id="table-content" className={classes.inner}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Numéro</TableCell>
                <TableCell>Contrat</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Objet</TableCell>
                <TableCell>Dernier contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demandes.map((item, i) => (
                <DemandeItem key={i} demande={item} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={demandes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

DemandeTable.propTypes = {
  className: PropTypes.string,
  staticContext: PropTypes.any,
  demandes: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      contrat: PropTypes.shape({
        id: PropTypes.string,
        societe: PropTypes.string,
      }).isRequired,
      contact: PropTypes.shape({
        id: PropTypes.string,
        nom: PropTypes.string,
        prenom: PropTypes.string,
      }).isRequired,
      objet: PropTypes.string,
      difficulte: PropTypes.number,
      lastContact: PropTypes.shape({
        nature: PropTypes.string,
        date: PropTypes.string,
      }),
    })
  ).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(DemandeTable);
