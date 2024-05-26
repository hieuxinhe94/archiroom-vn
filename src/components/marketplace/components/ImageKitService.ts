import ImageKit from 'imagekit'

class ImageKitService {
  private static instance: ImageKitService
  private imageKit: ImageKit
  constructor() {
    this.connect()
  }

  private connect() {
    const publicKey = 'public_9Rzr5rs0CgM8ycn7RhpHNe01lfs='
    const privateKey = 'private_oKp6585buzoT7FOPSoCmO+wv/uo='
    const urlEndpoint = 'https://ik.imagekit.io/tryonhub'

    const imagekit = new ImageKit({
      publicKey: publicKey,
      privateKey: privateKey,
      urlEndpoint: urlEndpoint,
    })
    this.imageKit = imagekit
  }

  static getInstance() {
    if (!ImageKitService.instance) {
      ImageKitService.instance = new ImageKitService()
    }
    return ImageKitService.instance.imageKit
  }
}

export const imageKitService = ImageKitService.getInstance()
