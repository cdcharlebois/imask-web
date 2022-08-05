import "./ui/IMaskWeb.css";
import { Component, Fragment, createElement } from "react";
import Alert from "./components/Alert";
import { IMask } from "react-imask";
import IMaskWrapper from "./components/IMaskWrapper";
import { hot } from "react-hot-loader/root";

class IMaskWeb extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedEntry = this.handleAcceptedEntry.bind(this);
        this.handleCompletedEntry = this.handleCompletedEntry.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
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
        const { onCompleteAction } = this.props;
        if (e) {
            this._executeAction(onCompleteAction);
        }
    }

    handleEnterKey(e) {
        const { onEnterKeyAction } = this.props;
        if (e.keyCode === 13) {
            this._executeAction(onEnterKeyAction);
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

        const definitions = {};
        objCustomDefinitions.forEach(obj => {
            definitions[obj.strCharacter] = new RegExp(obj.strRegex);
        });
        return definitions;
    }

    _getBlocks() {
        const { objCustomBlocks } = this.props;
        const blx = {};
        objCustomBlocks.forEach(block => {
            switch (block.enuBlockType) {
                case "pattern":
                    blx[block.strBlockName] = { mask: block.strBlockMask };
                    break;
                case "range":
                    blx[block.strBlockName] =
                        block.exprBlockFrom.status === "available" && block.exprBlockTo.status === "available"
                            ? {
                                  mask: IMask.MaskedRange,
                                  from: block.exprBlockFrom.value,
                                  to: block.exprBlockTo.value
                              }
                            : undefined;
                    break;
                default:
                    break;
            }
        });
        return blx;
    }

    _getAutoCompleteValue(key) {
        switch (key) {
            case "honorificprefix":
                return "honorific-prefix";
            case "givenname":
                return "given-name";
            case "additionalname":
                return "additional-name";
            case "familyname":
                return "family-name";
            case "honorificsuffix":
                return "honorific-suffix";
            case "newpassword":
                return "new-password";
            case "currentpassword":
                return "current-password";
            case "onetimecode":
                return "one-time-code";
            case "organizationtitle":
                return "organization-title";
            case "streetaddress":
                return "street-address";
            case "addressline1":
                return "address-line1";
            case "addressline2":
                return "address-line2";
            case "addressline3":
                return "address-line3";
            case "addresslevel4":
                return "address-level4";
            case "addresslevel3":
                return "address-level3";
            case "addresslevel2":
                return "address-level2";
            case "addresslevel1":
                return "address-level1";
            case "countryname":
                return "country-name";
            case "postalcode":
                return "postal-code";
            case "ccname":
                return "cc-name";
            case "ccgivenname":
                return "cc-given-name";
            case "ccadditionalname":
                return "cc-additional-name";
            case "ccfamilyname":
                return "cc-family-name";
            case "ccnumber":
                return "cc-number";
            case "ccexp":
                return "cc-exp";
            case "ccexpyear":
                return "cc-exp-year";
            case "cccsc":
                return "cc-csc";
            case "cctype":
                return "cc-type";
            case "transactioncurrency":
                return "transaction-currency";
            case "transactionamount":
                return "transaction-amount";
            case "bdayday":
                return "bday-day";
            case "bdaymonth":
                return "bday-month";
            case "bdayyear":
                return "bday-year";
            case "telcountrycode":
                return "tel-country-code";
            case "telnational":
                return "tel-national";
            case "telareacode":
                return "tel-area-code";
            case "tellocal":
                return "tel-local";
            case "telextension":
                return "tel-extension";
            case "other":
                return this.props.autocompleteOther;
            default:
                return key;
        }
    }

    render() {
        const {
            asPassword,
            attribute,
            autocomplete,
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
                    onKeyDown={this.handleEnterKey}
                    placeholder={placeholder.value}
                    className={"form-control"}
                    disabled={attribute.readOnly}
                    tabIndex={tabIndex}
                    autoComplete={this._getAutoCompleteValue(autocomplete)}
                    type={asPassword ? "password" : "text"}
                />
                <Alert type="danger" isValidation="true">
                    {attribute.validation}
                </Alert>
            </Fragment>
        );
    }
}

export default hot(IMaskWeb);
