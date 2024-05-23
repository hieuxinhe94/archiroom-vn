import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';

export default function VideoPlayer({ url, isOpenDetail, onClose }) {
  return (
    <div className="relative  hover:opacity-100 bg-slate-800 rounded-xl  text-white">
      {
        isOpenDetail && (<>
          <Modal size="5xl" isOpen={true} onOpenChange={() => { console.log('aaaaaaaaaaaa') }} isDismissable={false} isKeyboardDismissDisabled={true} onClose={() => { onClose(false) }}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Video</ModalHeader>
                  <ModalBody>
                    <div className='w-full flex'>
                      <video src={url} />
                    </div>
                  </ModalBody>
                  <ModalFooter className='pb-6'>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>

                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>)
      }
    </div >


  )
}

