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

  private albumCancelEventSource = new BehaviorSubject({});
  public albumCancelEventObservableSubject = this.albumCancelEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  emitDeleteAlbum(value: Album) {
    this.albumDeleteEventSource.next(value);
  }

  emitEditAlbum(value: Album) {
    this.albumEditEventSource.next(value);
  }

  emitCancelAlbum(value: Album) {
    this.albumCancelEventSource.next(value);
  }
}
