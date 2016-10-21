class Image {
  constructor(title){
    this.imageBase64;
    this.title = title;
    this.comments;
  }

  toJson(){
    return {
      'title': this.title,
      'imageBase64': this.imageBase64,
      'comments': this.comments
    }
  }
}
