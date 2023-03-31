import {CodeError} from "./codeError";
import status from "http-status";

function methodNotAllowed() {
    // #swagger.tags = ['Method Not Allowed']
    // #swagger.ignore = true
    throw new CodeError('Method not allowed', status.METHOD_NOT_ALLOWED);
}

export {methodNotAllowed};