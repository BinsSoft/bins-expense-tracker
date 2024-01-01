import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl: string = '';
  token: string = '';
  header:any =     {
    'X-GitHub-Api-Version': '2022-11-28',
    "Accept": "application/vnd.github+json"
  }
  constructor(private http: HttpClient) {

    this.header['Authorization'] = 'Bearer '+atob(atob('WjJod1gzcEdUMFZ5TVZKWU1teFVPR05CYVdOYVdsVnJOVGh3YUhSTFQwbENOVE52TUhCR2J3PT0='));
    this.baseUrl = 'https://api.github.com/repos/BinsSoft/bins-api-container/contents/expense-tracker';

  }

  checkUser(mobileNo:string) {
    return this.http.get(this.baseUrl+'/'+mobileNo, {headers: new HttpHeaders(this.header)});
  }

  create(path:string,message:string, body:any) {
    return this.http.put(this.baseUrl+'/'+path, JSON.stringify({
      content:btoa( JSON.stringify(body)),
      message:message,
      committer: {
        name: 'Tonmoy',
        email: 'tonmoy.nandy@gmail.com'
      }}), {headers: new HttpHeaders(this.header)});
  }
  update(path:string,message:string, body:any, sha:any = null) {
    return this.http.put(this.baseUrl+'/'+path, JSON.stringify({
      content:btoa( JSON.stringify(body)),
      message:message,
      sha: sha,
      committer: {
        name: 'Tonmoy',
        email: 'tonmoy.nandy@gmail.com'
      }}), {headers: new HttpHeaders(this.header)});
  }

  getContent(path:string) {
    return this.http.get(this.baseUrl+'/'+path, {headers: new HttpHeaders(this.header)});
  }

}
