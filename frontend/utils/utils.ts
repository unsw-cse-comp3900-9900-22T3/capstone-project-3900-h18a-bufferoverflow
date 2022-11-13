import { BlobServiceClient } from "@azure/storage-blob"

export const uploadFile = async (file: File) => {
  const service = new BlobServiceClient(
    "https://comp3900storage.blob.core.windows.net/?sv=2021-06-08&ss=bf&srt=sco&sp=rwdlaciytfx&se=2022-12-01T09:33:16Z&st=2022-09-25T02:33:16Z&spr=https&sig=uni0ZKrnnzcEsYL%2BF9Skp%2F%2B3MZmxeko1GZmM87NlA2w%3D"
  )
  // Create container
  const container = service.getContainerClient("files")
  await container.createIfNotExists({ access: 'container' })
  // Create new blob
  const blob = container.getBlockBlobClient(file.name)
  await blob.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } })
  return blob.url
}

export const parseFirebaseError = (error: string): string => {
  let res: string;
  try {
    res = error.split('/').at(-1)!.split('-').join(' ')
  } catch (e) {
    res = error;
  }
  return res;
}

// from https://github.com/Paraboly/react-osm-geocoding/blob/main/src/index.tsx
export class debouncedMethod<T>{
  constructor(method:T, debounceTime:number){
    this._method = method;
    this._debounceTime = debounceTime;
  }
  private _method:T;
  private _timeout:number;
  private _debounceTime:number;
  public invoke:T   = ((...args:any[])=>{
    this._timeout && window.clearTimeout(this._timeout);
    this._timeout = window.setTimeout(()=>{
      (this._method as any)(...args);
    },this._debounceTime);
  }) as any;
}