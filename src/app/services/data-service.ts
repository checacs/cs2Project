import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIcsSkins} from "../common/interfaces";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";
  getCsSkins(): Observable<APIcsSkins>{
    return this.http.get<APIcsSkins>(this.urlBase);
  }
}
