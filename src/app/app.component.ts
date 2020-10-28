import { Component,NgZone,OnInit } from '@angular/core';
import {WheatherService} from './wheather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {                                                                                                                                                                                                                                                                                                                                                         
 
  constructor(private _weatherService: WheatherService,private zone: NgZone){}

    arrayElements: any[] = [];
    items: string[] = [];
    errorMessage: string;

    ngOnInit(){
        for (let index = 0; index < 9; index++)
        { 
          this.arrayElements.push({'isadd':true, 'isedit': false, 'iserror':false });
        }
        if(localStorage.getItem("weatherdata"))
        {
            this.arrayElements = JSON.parse(localStorage.getItem("weatherdata"));
        }
        this.updateWheaterData();
    }

   edit(event,index) {
    event.preventDefault();
      this.arrayElements.forEach(element => 
      {
        return element["isadd"] = true;
      });
      this.errorMessage = "";
      this.arrayElements[index]["isadd"] = false;
   }
   
    onClick(event,cityName: string,index){
      if(event){
        this.errorMessage = "";
        event.preventDefault();
      }
    this._weatherService.getWeatheritemsbyCity(cityName).subscribe(data => {

          this.zone.runOutsideAngular(() => {
            this.arrayElements[index] = {
              'city': data["name"],
              'weatherDescription':data["weather"][0]["description"],
              'icon':data["weather"][0]["icon"],
              'temp':data["main"]["temp"],
              'isedit': true,
              'isadd':true,
              'iserror':false,
            };
          });
          localStorage.setItem("weatherdata", JSON.stringify(this.arrayElements));
        }, 
        error => 
        {
          this.arrayElements[index] = {
            'isedit': false,
            'isadd':true,
            'iserror':true
          };
          this.errorMessage = "city not found try again";
        });
    }
    
    getBackgroundimage(arrayitems){
      if(arrayitems.weatherDescription  == "clear sky" || arrayitems.weatherDescription  == "few clouds"  || arrayitems.weatherDescription == "broken clouds")
      {
        return 'skyPg' 
      }
      else if(arrayitems.weatherDescription == "shower rain" || arrayitems.weatherDescription == "rain" || arrayitems.weatherDescription == "heavy intensity rain" || arrayitems.weatherDescription == 'light rain' || arrayitems.weatherDescription == "light intensity drizzle")
      {
        return 'rainPg'
      }
      else if(arrayitems.weatherDescription == "thunderstorm")
      {
        return 'thunderPg'
      }
      else if(arrayitems.weatherDescription == "snow")
      {
        return 'snowPg'
      }
      else if(arrayitems.weatherDescription == "overcast clouds" || arrayitems.weatherDescription  == "scattered clouds")
      {
        return 'overcastPg'
      }
      else if(arrayitems.weatherDescription == "mist")
      {
        return 'windPg'
      }
    }

    updateWheaterData()
    {
      setInterval(() => {
        if(localStorage.getItem("weatherdata")){
          let weatherData = JSON.parse(localStorage.getItem("weatherdata"));
          for(let index = 0; index < weatherData.length; index++)
          {
            if(weatherData[index]["isedit"]){
              this.onClick(null,weatherData[index]["city"],index);
            }
          }
        }
      },30000);
    }
}
