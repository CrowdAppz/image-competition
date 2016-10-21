class Image {
  constructor(title){
    this.title = title;
    this.comments = [];
    this.tags = [];
    this.imageBase64;
  }

  toJson(){
    return {
      'title': this.title,
      'comments': this.comments,
      'tags': this.tags,
      'imageBase64': this.imageBase64,
    }
  }
}
