import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Grid, IconButton, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useMutation } from "react-apollo";
import LoginMutation from "../../graphql/mutations/Login.graphql";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    paddingTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  message: {
    fontSize: theme.typography.subtitle2.fontSize,
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SignIn = (props) => {
  const { history } = props;

  const [status, setStatus] = useState({
    hasErrors: false,
    errorText: (
      <>
        <strong>Echec :</strong> Les informations d&apos;identifications sont invalides.
      </>
    ),
  });

  const clearError = () => {
    setStatus({
      hasErrors: false,
      errorText: "",
    });
  };

  const [login, { data }] = useMutation(LoginMutation, {
    onError: (error) => {
      var errMsg = "Les informations d'identifications sont invalides.";

      if (
        !error.message.includes("[passwordAuth:secret:mismatch]") &&
        !error.message.includes("[passwordAuth:identity:notFound]")
      )
        errMsg = error.message;

      setStatus({
        hasErrors: true,
        errorText: (
          <>
            <strong>Echec : </strong>
            {errMsg}
          </>
        ),
      });
      // [passwordAuth:secret:mismatch]
      //[passwordAuth:identity:notFound]
    },
  });
  const classes = useStyles();

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = ({ email, password }) => {
    login({
      variables: {
        email: email,
        password: password,
      },
    });
    //history.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Bienvenue dans l&apos;outil de gestion de la relation avec les
                ayants-droits.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Gerald
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  version 0.1
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <div className={classes.form}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>

                {status.hasErrors && (
                  <Alert severity="error" className={classes.message}>
                    <AlertTitle>Error</AlertTitle>
                    {status.errorText}
                  </Alert>
                )}
                <LoginForm onSubmit={handleSubmit} formChanged={clearError} />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
