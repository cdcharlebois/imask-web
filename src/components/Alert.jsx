import PropTypes from "prop-types";
import { createElement } from "react";

const Alert = function(props) {
    return props.children ? (
        <div className={`alert alert-${props.type} ${props.isValidation ? "mx-validation-message" : ""}`}>
            {props.children}
        </div>
    ) : null;
};

Alert.propTypes = {
    children: PropTypes.node,
    isValidation: PropTypes.bool,
    type: PropTypes.oneOf(["info", "success", "warning", "danger"])
};

export default Alert;
