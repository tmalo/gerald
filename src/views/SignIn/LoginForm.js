import React, { useState, useEffect } from "react";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, TextField, Link, Typography } from "@material-ui/core";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const LoginForm = (props) => {
  const { onSubmit, formChanged } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox" ? event.target.checked : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));

    formChanged();
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    onSubmit({
      email: formState.values.email,
      password: formState.values.password,
    });
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form className={classes.root} onSubmit={handleSignIn}>
      <Typography
        align="center"
        className={classes.sugestion}
        color="textSecondary"
        variant="body1"
      >
        login with email address
      </Typography>
      <TextField
        className={classes.textField}
        error={hasError("email")}
        fullWidth
        helperText={hasError("email") ? formState.errors.email[0] : null}
        label="Email address"
        name="email"
        onChange={handleChange}
        type="text"
        value={formState.values.email || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={hasError("password")}
        fullWidth
        helperText={hasError("password") ? formState.errors.password[0] : null}
        label="Password"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ""}
        variant="outlined"
      />
      <Button
        className={classes.signInButton}
        color="primary"
        disabled={!formState.isValid}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in now
      </Button>
      <Typography color="textSecondary" variant="body1">
        Don&#39;t have an account?{" "}
        <Link component={RouterLink} to="/sign-up" variant="h6">
          Sign up
        </Link>
      </Typography>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  formChanged: PropTypes.func,
};

export default LoginForm;
