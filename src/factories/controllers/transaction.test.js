import {
    CreateTransactionController,
    DeleteTransactionController,
    UpdateTransactionController,

} from "../../controllers/index";
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeUpdateTransactionController,

} from "./transaction";

describe("Transaction Controller Factories", () => {
    it("should return a valid CreateTransactionController instance", () => {
        expect(makeCreateTransactionController()).toBeInstanceOf(
            CreateTransactionController,
        );
    });

    it("should return a valid UpdateTransactionController instance", () => {
        expect(makeUpdateTransactionController()).toBeInstanceOf(
            UpdateTransactionController,
        );
    });

    it("should return a valid DeleteTransactionController instance", () => {
        expect(makeDeleteTransactionController()).toBeInstanceOf(
            DeleteTransactionController,
        );
    });

});