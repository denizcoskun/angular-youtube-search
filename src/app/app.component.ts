import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { YoutubeService } from './services/youtube.service';
import { Video } from './models/video.model';
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  results: Video[];

  @ViewChild('input') input: ElementRef;

  constructor(private youtube: YoutubeService) {}


  ngOnInit(): void {

  Observable.fromEvent(this.input.nativeElement, 'keyup')
          .map((e: any) => e.target.value)
          .filter((text: string) => text.length > 1)
          .debounceTime(250)
          .do(() => this.loading.next(true))
          .map((query: string) => this.youtube.search(query))
          .switch()
          .subscribe((results: Video[] ) => {
            this.loading.next(false);
            this.results = results;
          }, 
            (error: any) => {
              this.loading.next(false);
            }
          ,() => {
            this.loading.next(false);
          }
        );

  }


}
