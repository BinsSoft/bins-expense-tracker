import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  headers: HttpHeaders;
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer '+ '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',
      'X-GitHub-Api-Version': '2022-11-28',
      "Accept": "application/vnd.github+json"
    });
    this.baseUrl = 'https://api.github.com/repos/BinsSoft/bins-api-container/contents/expense-tracker';

  }

  checkUser(mobileNo:string) {
    return this.http.get(this.baseUrl+'/'+mobileNo, {headers: this.headers});
  }

  create(path:string,message:string, body:any) {
    return this.http.put(this.baseUrl+'/'+path, JSON.stringify({
      content:btoa( JSON.stringify(body)),
      message:message,
      committer: {
        name: 'Tonmoy',
        email: 'tonmoy.nandy@gmail.com'
      }}), {headers: this.headers});
  }
  update(path:string,message:string, body:any, sha:any = null) {
    return this.http.put(this.baseUrl+'/'+path, JSON.stringify({
      content:btoa( JSON.stringify(body)),
      message:message,
      sha: sha,
      committer: {
        name: 'Tonmoy',
        email: 'tonmoy.nandy@gmail.com'
      }}), {headers: this.headers});
  }

  getContent(path:string) {
    return this.http.get(this.baseUrl+'/'+path, {headers: this.headers});
  }

}
