export class HttpNotFoundError extends Error {
    status: number;
    
    constructor(message: string) {
        super(); // Call this because you use 'extends'
        this.message = message;
        this.status = 404;
    }
}