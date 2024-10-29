
export abstract class S3UploadImage {
  abstract saveFile(
    file: any,
    bucket?: string,
  ): Promise<string>;
}
