import Model from "./Model";

class FileModel extends Model{
  static path = "file";

  static async upload(data: any) {
    return await fetch("https://api-ap.cloudinary.com/v1_1/dyg39hfua/image/upload", {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  }
}

export default FileModel;
