import { Component } from '@angular/core';
import * as config from '../configs/config.json';
import { IConfiguration, ConfigService } from '../services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  private configuration: IConfiguration;
  constructor(
    private configService: ConfigService
  ){
    this.configuration = this.configService.getConfig();
  }

  ngOnInit(){
    //console.log(this.configService.getConfig()); //enable for testing config service
  }
}
