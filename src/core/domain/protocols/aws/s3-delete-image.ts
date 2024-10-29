export abstract class S3DeleteImage {
  abstract deleteBucket(object_key: string): Promise<void>;
}
