import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

// import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/IMaskWeb.css";
import { IMaskInput } from 'react-imask';

class IMaskWeb extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedEntry = this.handleAcceptedEntry.bind(this);
        this.handleCompletedEntry = this.handleCompletedEntry.bind(this);
        this._executeAction = this._executeAction.bind(this);
    }

    handleAcceptedEntry(value, mask) {
        const { attribute, onAcceptAction } = this.props;
        if (value !== attribute.value) {
            attribute.setValue(value);
            this._executeAction(onAcceptAction);
        }

    }

    handleCompletedEntry(value) {
        const { attribute, onCompleteAction } = this.props;
        if (value !== attribute.value) {
            this._executeAction(onCompleteAction);
        }

    }

    _executeAction(action) {
        if (action && action.canExecute) {
            action.execute();
        }
    }

    render() {
        const { attribute, maskString, placeholder } = this.props;
        return (
            <IMaskInput
                mask={maskString}
                value={attribute.value}
                unmask={true} // true|false|'typed'
                onAccept={this.handleAcceptedEntry}
                onComplete={this.handleCompletedEntry}
                placeholder={placeholder.value}
            />
        )

    }
}

export default hot(IMaskWeb);
