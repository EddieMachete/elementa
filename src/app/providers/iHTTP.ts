'use strict';

export interface IHTTP {
    //request(url: string|Request, options?): Promise<Response>;
    get(url: string, options?): Promise<any>;
    post(url: string, body: any, options?): Promise<any>;
    put(url: string, body: any, options?): Promise<any>;
    delete(url: string, options?): Promise<any>;
    patch(url: string, body: any, options?): Promise<any>;
    head(url: string, options?): Promise<any>;
    options(url: string, options?): Promise<any>;
}
