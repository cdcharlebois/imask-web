import { Component, createElement } from "react";
import IMaskWrapper from "./components/IMaskWrapper";

export class preview extends Component {
    render() {
        const { strMaskPattern, attribute, blnOverwriteMode, blnLazy, strPlaceholderChar } = this.props;
        return (
            <IMaskWrapper
                mask={strMaskPattern}
                definitions={null}
                blocks={null}
                value={`{${attribute}}`}
                overwrite={blnOverwriteMode}
                lazy={blnLazy}
                placeholderChar={strPlaceholderChar}
                unmask={true} // true|false|'typed'
                onAccept={null}
                onComplete={null}
                placeholder={attribute}
                className={`form-control`}
                disabled={false}
            />
        );
    }
}

export function getPreviewCss() {
    return require("./ui/IMaskWeb.css");
}
