'use strict';

import { IHTTP } from "./";

export class XMLHTTP implements IHTTP {
  public get(url: string, options?): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
  
      xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(`${status} :: ${xhr.response}`);
        }
      };
  
      xhr.send();
    });
  }

  post(url: string, body: any, options?): Promise<any> {
    return Promise.resolve({});
  }

  put(url: string, body: any, options?): Promise<any> {
    return Promise.resolve({});
  }

  delete(url: string, options?): Promise<any> {
    return Promise.resolve({});
  }

  patch(url: string, body: any, options?): Promise<any> {
    return Promise.resolve({});
  }

  head(url: string, options?): Promise<any> {
    return Promise.resolve({});
  }

  options(url: string, options?): Promise<any> {
    return Promise.resolve({});
  }
}