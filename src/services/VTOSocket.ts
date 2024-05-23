import axios from 'axios'
import io, { Socket } from 'socket.io-client'

export class VTOSocket {
  async registerImageRoom(imageId: string, socketId: string) {
    return await axios.get(
      `https://tryonhub.southeastasia.cloudapp.azure.com/api/tryon/upload-file/join-vto/${socketId}/${imageId}`,
    )
  }

  createSocket() {
    const socket = io('http://20.24.51.54:26294/', {
      transports: ['websocket'],
    })
    return socket
  }

  on(
    socket: Socket,
    cbSocketId: (skId: string) => Promise<void>,
    cbData: (data) => void,
  ) {
    const onVto = () => {
      socket.on('vto', (res) => {
        cbData(res)
      })
    }
    socket.on('connect', async () => {
      await cbSocketId(socket.id)
      onVto()
    })

    return () => {
      socket.disconnect()
    }
  }
}

export const vtoSocket = new VTOSocket()
