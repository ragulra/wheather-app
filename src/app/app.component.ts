import { Component,OnInit } from '@angular/core';
import {WheatherService} from './wheather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {                                                                                                                                                                                                                                                                                                                                                         
 
  constructor(private _weatherService: WheatherService){}

    arrayElements: any[] = [];
    items: string[] = [];
    errorMessage: string;

    ngOnInit(){
        for (let index = 0; index < 9; index++){ 
          this.arrayElements.push({'isadd':true, 'isedit': false, 'iserror':false });
        }
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
    this.errorMessage = "";
    event.preventDefault();

    this._weatherService.getWeatheritemsbyCity(cityName).subscribe(data => {

        // var redVal = 255 / (data["main"]["temp_max"] - data["main"]["temp_min"]) * (data["main"]["temp"] - data["main"]["temp_min"]);
        // var blueVal = 255 / (data["main"]["temp_max"] - data["main"]["temp_min"]) * (data["main"]["temp_max"] - data["main"]["temp"]);

          this.arrayElements[index] = {
            'city': data["name"],
            'weatherDescription':data["weather"][0]["description"],
            'icon':data["weather"][0]["icon"],
            'temp':data["main"]["temp"],
            'isedit': true,
            'isadd':true,
            'iserror':false,
          };
        }, 
        error => 
        {
          this.arrayElements[index] = 
          {
            'isedit': false,
            'isadd':true,
            'iserror':true
          };
          this.errorMessage = "city not found try again";
        });
    }
    
    // getBackgroundColor(arrayitems)
    // {
    //  return "rgb(" + arrayitems.redcolor + ", 0," + arrayitems.bluecolor +")"
    // }
}
