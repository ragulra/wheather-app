import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WheatherService {
  constructor(private http: HttpClient){}
  getWeatheritemsbyCity(cityName: string): Observable<any>{
    
    return this.http.get(
      environment.baseUrl +
      'weather?q=' + cityName +
      '&appid=' + environment.appId +
      '&units=' + environment.units
    )
  }
}
