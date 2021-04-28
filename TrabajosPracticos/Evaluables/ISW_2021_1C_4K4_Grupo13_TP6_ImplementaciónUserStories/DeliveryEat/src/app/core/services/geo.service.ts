import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  link = 'https://api.geoapify.com/v1/geocode/reverse?'
  constructor (private readonly http: HttpClient) {}
  getUbicacion (lat, lon): any {
    console.log(this.link + 'lat=' + lat + '&lon=' + lon + '&apiKey=fde083915656465fa1d6b32396bf2abb')
    return this.http.get(this.link + 'lat=' + lat + '&lon=' + lon + '&apiKey=fde083915656465fa1d6b32396bf2abb')
  }
}
