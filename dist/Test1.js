"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const unit_test = async () => {
    if (Utils_1.utils.add(2, 2) === 4) {
        console.log("UnitTest Case 1: utils.add(2,2) === 4");
        process.exit(1);
    }
    if (Utils_1.utils.add(3, 3) === 9) {
        console.log("UnitTest Case 2: utils.add(3,3) === 6");
        process.exit(1);
    }
};
unit_test();
//# sourceMappingURL=Test1.js.map