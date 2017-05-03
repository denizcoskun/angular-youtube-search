import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Video } from '../models/video.model';

let YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
let YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/sear\ch';

@Injectable()
export class YoutubeService {

  constructor(private http: Http,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<Video[]> {

    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    let queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl).map((response: Response) =>
      response.json().items.map(item => {
        return new Video({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      })
    );
  }

}


export var youtubeSearchServiceInjectables: Array<any> = [
  { provide: YoutubeService, useClass: YoutubeService },
  { provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY },
  { provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL }
];