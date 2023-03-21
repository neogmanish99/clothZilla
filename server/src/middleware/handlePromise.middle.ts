import { Request, Response, NextFunction } from "express";

interface ICallback {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

/**
 * This handlePromise takes a function and execute that in a promise way
 *
 * Wrapping it around the async methods to not use try/catch
 */

export default (func: ICallback) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch(next);
    };
