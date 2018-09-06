import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil, tap } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: Http) { }

  getAllPersons() {
    let ReqOpts = new RequestOptions();
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    ReqOpts.headers = headers;
    return this.http.get('https://textservice-dcxcaagtwu.now.sh/v1/get/allPersons', ReqOpts)
      .pipe(map(
        (response: any) => {
          return response.json();
        }));
  }

  deletePersonByID(id: string) {
    let ReqOpts = new RequestOptions();
    let headers = new Headers();
    let personObj = {
      person_id: id
    }
    headers.append('Content-Type', 'application/json');
    ReqOpts.headers = headers;
    return this.http.post('https://textservice-dcxcaagtwu.now.sh/v1/delete/person', personObj, ReqOpts)
      .pipe(map(
        (response: any) => {
          return response.json();
        }));
  }
  editPersonByID(personObj) {
    let ReqOpts = new RequestOptions();
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    ReqOpts.headers = headers;
    return this.http.post('https://textservice-dcxcaagtwu.now.sh/v1/edit/person/' + personObj._id, personObj, ReqOpts)
      .pipe(map(
        (response: any) => {
          return response.json();
        }));
  }

  addPerson(personObj) {
    let ReqOpts = new RequestOptions();
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    ReqOpts.headers = headers;
    return this.http.post('https://textservice-dcxcaagtwu.now.sh/v1/save/person', personObj, ReqOpts)
      .pipe(map(
        (response: any) => {
          return response.json();
        }));
  }

  uploadCloudinaryImage(formData: FormData) {
    var headers = new Headers();
    var ReqOpts = new RequestOptions()
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    ReqOpts.headers = headers;
    return this.http.post('https://api.cloudinary.com/v1_1/dsxd0cl3w/auto/upload', formData, ReqOpts)
      .pipe(map(response => {
        return response.json();
      }));
  }

}
