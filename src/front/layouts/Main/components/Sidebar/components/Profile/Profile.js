import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography, CircularProgress } from "@material-ui/core";
import { Query } from "@apollo/react-components";
import ProfileQuery from "api/remote/queries/Profile.graphql";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

function getInitials(user) {
  return `${user.prenom.slice(0, 1)}${user.nom.slice(0, 1)}`.toUpperCase();
}

const Profile = (props) => {
  const { className, ...rest } = props;
  var history = useHistory();

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Query query={ProfileQuery}>
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress />;

          if (data.authenticatedUser === null) {
            history.push("/sign-in");
            return "not authenticated";
          }

          if (error) return `Error! ${error}`;

          return (
            <>
              <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                to="/settings"
              >
                {getInitials(data.authenticatedUser)}
              </Avatar>
              <Typography className={classes.name} variant="h4">
                {data.authenticatedUser.prenom} {data.authenticatedUser.nom}
              </Typography>
              <Typography variant="body2">Conseiller</Typography>
            </>
          );
        }}
      </Query>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
