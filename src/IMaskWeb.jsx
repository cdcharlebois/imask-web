import { Component, createElement, Fragment } from "react";
import { hot } from "react-hot-loader/root";
import { IMaskInput } from "react-imask";
import "./ui/IMaskWeb.css";

import Alert from "./components/Alert";
import IMaskWrapper from "./components/IMaskWrapper";

class IMaskWeb extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedEntry = this.handleAcceptedEntry.bind(this);
        this.handleCompletedEntry = this.handleCompletedEntry.bind(this);
        this._executeAction = this._executeAction.bind(this);
        this._getCustomDefinitions = this._getCustomDefinitions.bind(this);
        this._getBlocks = this._getBlocks.bind(this);
    }

    handleAcceptedEntry(value, mask, e) {
        const { attribute, onAcceptAction } = this.props;
        if (e) {
            attribute.setValue(value);
            this._executeAction(onAcceptAction);
        }
    }

    handleCompletedEntry(value, mask, e) {
        const { attribute, onCompleteAction } = this.props;
        if (e) {
            this._executeAction(onCompleteAction);
        }
    }

    _executeAction(action) {
        if (action && action.canExecute) {
            action.execute();
        }
    }

    /**
     * Define custom mask character definitions.
     * ---
     * see for more details https://imask.js.org/guide.html#masked-pattern
     * @returns {Object} Definitions
     * @author Conner Charlebois
     * @since Jun 2, 2020
     */
    _getCustomDefinitions() {
        const { objCustomDefinitions } = this.props;

        if (!objCustomDefinitions) return null;

        let definitions = {};
        objCustomDefinitions.forEach(obj => {
            definitions[obj.strCharacter] = new RegExp(obj.strRegex);
        });
        return definitions;
    }

    _getBlocks() {
        const { objCustomBlocks } = this.props;
        let blx = {};
        objCustomBlocks.forEach(block => {
            switch (block.enuBlockType) {
                case "pattern":
                    blx[block.strBlockName] = { mask: block.strBlockMask };
                case "range":
                    blx[block.strBlockName] =
                        block.exprBlockFrom.status === "available" && block.exprBlockTo.status === "available"
                            ? {
                                  mask: IMask.MaskedRange,
                                  from: block.exprBlockFrom.value,
                                  to: block.exprBlockTo.value
                              }
                            : undefined;
            }
        });
        return blx;
    }

    render() {
        const {
            attribute,
            strMaskPattern,
            placeholder,
            blnOverwriteMode,
            strPlaceholderChar,
            blnLazy,
            tabIndex
        } = this.props;
        return (
            <Fragment>
                <IMaskWrapper
                    mask={strMaskPattern}
                    definitions={this._getCustomDefinitions()}
                    blocks={this._getBlocks()}
                    value={attribute.value}
                    overwrite={blnOverwriteMode}
                    lazy={blnLazy}
                    placeholderChar={strPlaceholderChar}
                    unmask={true} // true|false|'typed'
                    onAccept={this.handleAcceptedEntry}
                    onComplete={this.handleCompletedEntry}
                    placeholder={placeholder.value}
                    className={`form-control`}
                    disabled={attribute.readOnly}
                    tabIndex={tabIndex}
                />
                <Alert type="danger" isValidation="true">
                    {attribute.validation}
                </Alert>
            </Fragment>
        );
    }
}

export default hot(IMaskWeb);
