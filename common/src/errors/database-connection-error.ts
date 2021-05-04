import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database'
    constructor(){
        super("Error connecting to DB");

        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    };
    serializeError(){
        return [{ message: this.reason }]
    }
}