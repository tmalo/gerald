import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Detail = (props) => {
  const { className, spacing, children, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.content}>
        <Grid container spacing={spacing}>
          {children}
        </Grid>
      </div>
    </div>
  );
};

Detail.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  spacing: PropTypes.number,
};

Detail.defaultProps = {
  spacing: 4,
};

export default Detail;
