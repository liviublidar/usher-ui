import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IConfiguration, ConfigService } from '../services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;
  private configuration: IConfiguration;
  public loginEmailControl: FormControl = new FormControl('');
  public loginPwdControl: FormControl =  new FormControl('');

  constructor(
    private configService: ConfigService
  ){
    this.configuration = this.configService.getConfig();
  }

  ngOnInit(){
    //console.log(this.configService.getConfig()); //enable for testing config service
  }
}
