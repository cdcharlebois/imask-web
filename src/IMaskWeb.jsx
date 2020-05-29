import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

// import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/IMaskWeb.css";
import { IMaskInput } from 'react-imask';

class IMaskWeb extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedEntry = this.handleAcceptedEntry.bind(this);
    }

    handleAcceptedEntry(value, mask) {
        const { attribute } = this.props;
        attribute.setValue(value);
    }

    handleCompletedEntry(value) {
        console.log(value);
    }

    render() {
        const { attribute, maskString, placeholder } = this.props;
        return (
            <IMaskInput
                mask={maskString}
                value={attribute.value}
                unmask={true} // true|false|'typed'
                // DO NOT USE onChange TO HANDLE CHANGES!
                onAccept={this.handleAcceptedEntry}
                onComplete={this.handleCompletedEntry}
                // input props also available
                placeholder={placeholder.value}
            />
        )

    }
}

export default hot(IMaskWeb);
