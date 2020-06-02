import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

import "./ui/IMaskWeb.css";
import { IMaskInput } from 'react-imask';

class IMaskWeb extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedEntry = this.handleAcceptedEntry.bind(this);
        this.handleCompletedEntry = this.handleCompletedEntry.bind(this);
        this._executeAction = this._executeAction.bind(this);
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

    render() {
        const {
            attribute,
            strMaskPattern,
            // strMaskRegex,
            // enuMaskType,
            placeholder,
            blnOverwriteMode,
            strPlaceholderChar,
            blnLazy
        } = this.props;
        return (
            <IMaskInput
                mask={strMaskPattern}
                value={attribute.value}
                overwrite={blnOverwriteMode}
                lazy={blnLazy}
                placeholderChar={strPlaceholderChar}
                unmask={true} // true|false|'typed'
                onAccept={this.handleAcceptedEntry}
                onComplete={this.handleCompletedEntry}
                placeholder={placeholder.value}
            />
        )

    }
}

export default hot(IMaskWeb);
