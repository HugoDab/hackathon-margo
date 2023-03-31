class CodeError extends Error {
    private code: number;

    constructor(message: string, code: number) {
        super(message)
        this.code = code
        console.error(message)
    }
}

export {CodeError}
