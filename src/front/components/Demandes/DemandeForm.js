import React from "react";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Formik, Form, Field } from "formik";
import { TextField, KeyboardDatePicker, Select } from "material-ui-formik-components";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Grid, Divider, Button } from "@material-ui/core";
import { default as UsagerComboBox } from "../UsagerComboBox";
import { default as RichEditor } from "../RichEditor";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const validate = require("validate.js");
var moment = require("moment");
require("moment/locale/fr");

moment.locale("fr");

const editorState = EditorState.createEmpty();
const contentState = convertToRaw(editorState.getCurrentContent());

const enums = require("enums");

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const usagers = [
  {
    id: "5ede22c60037ce1320ec9044",
    _label_: "Thierry MALO",
    nom: "MALO",
    prenom: "Thierry",
    contrat: {
      societe: "Banque Postale",
    },
  },
];

var constraints = {
  usager: {
    presence: true,
    type: "string",
    length: {
      minimum: 3,
      message: "sélectionnez un usager",
    },
  },
  subject: {
    presence: true,
    type: "string",
    length: {
      minimum: 3,
    },
  },
  difficulte: {
    presence: true,
  },
  etape: {
    presence: true,
    type: "integer",
  },
  commentaire: {
    presence: true,
  },
};

const DemandeForm = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Nouvelle demande" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            usager: undefined,
            subject: "",
            difficulte: "",
            etape: 1,
            date_reponse: new Date(),
            commentaire: contentState,
          }}
          validate={(values) => validate(values, constraints)}
          onSubmit={(values) => {
            alert(`Subject: ${values.subject}\nDifficulte: ${values.difficulte}
                    \nUsager: ${JSON.stringify(values.usager)}
                    \nEtape: ${values.etape}\nDateReponse: ${values.date_reponse}
                    \nNotes: ${JSON.stringify(values.commentaire)}`);
          }}
        >
          {(formik) => {
            return (
              <Form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={6}>
                    <Field name="usager">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      }) => (
                        <div aria-describedby={`"${field.name}-error-text"`}>
                          <UsagerComboBox
                            name="usager"
                            required
                            data={usagers}
                            onChange={(value) =>
                              formik.setFieldValue("usager", value?.id)
                            }
                          />
                          {touched[field.name] && errors[field.name] && (
                            <FormHelperText id={`"${field.name}-error-text"`}>
                              {errors[field.name]}
                            </FormHelperText>
                          )}
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <Grid item md={8} xs={6}>
                    <Field name="subject" label="Sujet" required component={TextField} />
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Field
                      name="difficulte"
                      label="Difficulté"
                      options={enums.Difficulte_options}
                      component={Select}
                    />
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Field
                      name="etape"
                      label="Étape"
                      options={enums.Etape_options}
                      component={Select}
                    />
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Field
                      name="date_reponse"
                      label="Date limite de réponse"
                      format="DD/MM/YYYY"
                      component={KeyboardDatePicker}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Field name="commentaire">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      }) => (
                        <div aria-describedby={`"${field.name}-error-text"`}>
                          <RichEditor
                            //contentState={formik.values.commentaire}
                            onContentStateChange={(v) =>
                              formik.setFieldValue("commentaire", v)
                            }
                            onBlur={field.onBlur}
                          />
                          {touched[field.name] && errors[field.name] && (
                            <FormHelperText id={`"${field.name}-error-text"`}>
                              {errors[field.name]}
                            </FormHelperText>
                          )}
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Button type="submit" color="primary" disabled={!formik.isValid}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

DemandeForm.propTypes = {
  className: PropTypes.string,
};

export default DemandeForm;
