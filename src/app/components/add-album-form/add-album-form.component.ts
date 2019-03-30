import { Component, OnInit, ViewChild } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { AlbumsEventsService } from "../../services/albums-events.service";
import { Album } from "../../interfaces/album";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-album-form",
  templateUrl: "./add-album-form.component.html",
  styleUrls: ["./add-album-form.component.css"]
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: ""
  };
  @ViewChild("addAlbumForm") form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumsEventsService
  ) {}

  ngOnInit() {}

  onFormSubmit() {
    const newAlbum = {
      userId: 5,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      console.log("Get data FormComponent");
      this.albumEvents.emitAddNewAlbum(data);
      this.form.resetForm();
    });
  }
}
