import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";




@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgForOf],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit, OnDestroy{
  BASE_URL = "https://us-east1-serverless-306422.cloudfunctions.net/figlet";
  fonts = [];
  currentValue = "hello";
  result : any;
  currentFront = "Cricket";
  private fontsSubscription : Subscription;
  constructor(private httpClient : HttpClient){
  }
  // TODO
  ngOnInit(){
    this.getFonts();
  }

  ngOnDestroy() {
    if (this.fontsSubscription) {
      this.fontsSubscription.unsubscribe();
    }
  }

  getFonts(){
    this.fontsSubscription = this.httpClient.get(`${this.BASE_URL}/fonts`).subscribe({
      next : (response : any) => {
        if(response.fonts){
          this.fonts = response.fonts;
          this.onLaunchRequest();
        }
      },
      error: error => {}
    });
  }

  onInputDataChange(){
    this.onLaunchRequest();
  }

  onSelectDataChange(){
    this.onLaunchRequest();
  }

  onLaunchRequest(){
    if(this.currentValue.length > 0){
      this.httpClient.get(`${this.BASE_URL}?text=${this.currentValue}&font=${this.currentFront}`)
        .subscribe({
          next : (response : any) => {
            if(response.text){
              this.result = response.text
            }
          },
          error: error => {}
        });
    }
  }
}

