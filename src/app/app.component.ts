import { Component } from '@angular/core';
import * as config from '../configs/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = config.default.project.name;

  constructor(){}

  ngOnInit(){
    console.log(this.title)
  }
}
