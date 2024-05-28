import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';
import PlayGroundChatBot from './playground-chatbot';
import PlayGroundTryOn from './playground-tryon';
import PlayGroundArchitecture from './playground-architecture';
import PlayGroundFilmMaking from './playground-film';

export default function QuickPlayAI(props) {
  console.log(props.config)
  return (

    <div className='w-full block lg:flex h-auto overflow-y-scroll p-4'>

      {
        (props.config.code === "tryonhub") && (<PlayGroundTryOn status={true} onCloseEvent={() => { console.log("closed"); props.onCloseEvent(); }} />)
      }

      {
        (props.config.code === "ai-chatbot") && (<PlayGroundChatBot config={props.config} onCloseEvent={props.onCloseEvent} />)
      }

      {
        (props.config.code === "ai-architecture") && (<PlayGroundArchitecture config={props.config} onCloseEvent={props.onCloseEvent} />)
      }

      {
        (props.config.code === "ai-film-maker") && (<PlayGroundFilmMaking config={props.config} onCloseEvent={props.onCloseEvent} />)
      }
    </div>

  )
}

