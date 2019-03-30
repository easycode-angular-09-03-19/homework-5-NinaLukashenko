import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/album";

@Injectable({
  providedIn: "root"
})
export class AlbumsEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    console.log("Service", value);
    this.albumAddEventSource.next(value);
  }
}
