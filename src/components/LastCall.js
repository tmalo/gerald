import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Phone as PhoneIcon,
  Mail as MailIcon,
  Help as HelpIcon,
  DescriptionOutlined as LetterIcon,
  WebAsset as EspBenIcon,
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

var moment = require("moment");
require("moment/locale/fr");

moment.locale("fr");

const useStyles = makeStyles((theme) => ({
  root: {},
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  nature: {
    marginRight: theme.spacing(1),
  },
}));

const ChannelIcon = React.forwardRef(function ChannelIcon(props, ref) {
  const { className, nature, ...rest } = props;

  const classes = useStyles();

  const icon_props = Object.assign({}, rest, {
    //ref: ref,
    className: clsx(classes.nature, className),
    color: "disabled",
    fontSize: "small",
  });

  switch (nature) {
    case "CALL":
      return <PhoneIcon ref={ref} {...icon_props} />;
    case "MAIL":
      return <MailIcon ref={ref} {...icon_props} />;
    case "LTTR":
      return <LetterIcon ref={ref} {...icon_props} />;
    case "ESPB":
      return <EspBenIcon ref={ref} {...icon_props} />;
    default:
      return <HelpIcon ref={ref} {...icon_props} />;
  }
});

ChannelIcon.propTypes = {
  className: PropTypes.string,
  nature: PropTypes.string.isRequired,
};

const LastCall = (props) => {
  const { className, label, nature, callDate, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.statusContainer, className)}>
      <Tooltip {...rest} title={label}>
        <ChannelIcon nature={nature} className={classes.nature} />
      </Tooltip>
      {moment(callDate).format("DD MMM YYYY HH:MM:ss")}
    </div>
  );
};

LastCall.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  callDate: PropTypes.string.isRequired,
};

export default LastCall;
