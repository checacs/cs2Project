import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIcsSkins} from "../common/interfaces";
import {CSMarketAPI, Market, Currency} from "csmarketapi";


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly urlApiInventory =
    "https://www.steamwebapi.com/steam/api/inventory?key=5F3TVMXHP4A2UTOB&steam_id=76561198813449634"
  favoritosList: APIcsSkins = [];
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlBase = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";
  getCsSkins(): Observable<APIcsSkins>{
    return this.http.get<APIcsSkins>(this.urlBase);
  }
  addFavorito(skin: any){
    if (!this.favoritosList.find(s =>
      s.id === skin.id))
    {
      this.favoritosList.push(skin);
    }
  }
  removeFavorito(id: string){
    this.favoritosList = this.favoritosList.filter(skin =>
      skin.id !== id);

  }

  getFavoritos(){
    return this.favoritosList;
  }

}
