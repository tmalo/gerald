import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { default as SiteItem } from "./SiteItem";

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

const SiteTable = (props) => {
  const {
    className,
    // eslint-disable-next-line no-unused-vars
    staticContext,
    sites,
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
              history.push("/add-site");
            }}
          >
            Nouveau site
          </Button>
        }
        //                title="Mes Demandes"
      />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Libelle</TableCell>
                  <TableCell>Rue</TableCell>
                  <TableCell>Ville</TableCell>
                  <TableCell>Pays</TableCell>
                  <TableCell>Nb. Contacts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites.map((item, i) => (
                  <SiteItem key={i} site={item} />
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sites.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

SiteTable.propTypes = {
  className: PropTypes.string,
  staticContext: PropTypes.any,
  sites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      libelle: PropTypes.string,
      adresse_rue: PropTypes.string,
      adresse_ville: PropTypes.string,
      adresse_codepostal: PropTypes.string,
      adresse_pays: PropTypes.string,
      nb_usagers: PropTypes.exact({
        count: PropTypes.number,
      }),
    })
  ).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SiteTable);
