import {
    CreateTransactionController,

} from "../../controllers/index";
import {
    makeCreateTransactionController,

} from "./transaction";

describe("Transaction Controller Factories", () => {
    it("should return a valid CreateTransactionController instance", () => {
        expect(makeCreateTransactionController()).toBeInstanceOf(
            CreateTransactionController,
        );
    });


});