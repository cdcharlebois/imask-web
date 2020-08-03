// this will be the properties dialog config
import { hidePropertyIn } from "./piw-utils-js";

export function getProperties(values, defaults) {
    // values maps to the widget Properties
    values.objCustomBlocks.forEach((block, index) => {
        switch (block.enuBlockType) {
            case "pattern":
                hidePropertyIn(defaults, values, "objCustomBlocks", index, "exprBlockFrom");
                hidePropertyIn(defaults, values, "objCustomBlocks", index, "exprBlockTo");
                break;
            case "range":
                hidePropertyIn(defaults, values, "objCustomBlocks", index, "strBlockMask");
                break;
        }
    });
    return defaults;
}
