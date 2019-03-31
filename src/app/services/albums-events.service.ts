import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/album";

@Injectable({
  providedIn: "root"
})
export class AlbumsEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumDeleteEventSource = new BehaviorSubject({});
  public albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();

  private albumEditEventSource = new BehaviorSubject({});
  public albumEditEventObservableSubject = this.albumEditEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  emitDeleteAlbum(value: Album) {
    console.log("Albums-events.service", value);
    this.albumDeleteEventSource.next(value);
  }

  emitEditAlbum(value: Album) {
    console.log("Albums-events.service", value);
    this.albumEditEventSource.next(value);
  }
}
