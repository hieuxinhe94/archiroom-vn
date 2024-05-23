import { Button, Image as Image2 } from '@nextui-org/react'
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next"
import { SessionProvider,signIn, signOut, useSession } from "next-auth/react"
import { getProviders } from "next-auth/react"
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

import Container from '~/components/Container'
import UploadHumanBody from "~/components/UploadHumanBody";
import { imageKitService } from "~/services/ImageKitService";
import { vtoService } from "~/services/VTOService";

import modelPhoto from '../../public/images/body-photo-1.jpg'
import { authOptions } from "../pages/api/auth/[...nextauth]"
import Layout from "./Layout";
import LoginApp from "./LoginApp";
import { getCurrentUserByBrowser, handleConfetti, putCachingUserToBrowser } from "./try-on-plugin";



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } }
    }

    const providers = await getProviders()
    console.log(providers);
    return {
        props: { providers: providers ?? [] },
    }
}

export default function BizAuthenticatePage(props) {
    const [step, setStep] = useState(0)
    const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())
    const router = useRouter()
    console.log(currentUser)
    const [detectedImages, setDetectedImages] = useState<string[]>([])
    const { data: session } = useSession()

    return (
        <>

            <NextSeo
                title={`${"Sign In to TryOnHub.AI"}`}
                description={"" || ""}
                canonical={`/register-biz`}
                twitter={{
                    cardType: "summary_large_image",
                }}
            />
            <div className="profile-container h-[90vh] bg-white overflow-auto">
                <div className="bg-gradient-to-r from-purple-gd to-blue-gd h-[3px]"></div>
                {/* <Button onClick={() => signIn()} color="primary">
                    SSO Login
                </Button> */}
                <Container>
                    <LoginApp status={true}
                        ssoproviders={props.providers ?? []}
                        
                        onSuccessEvent={(_currentUser) => {
                            console.log("onLoginSuccessedEvent");
                            _currentUser.hasLogin = true;
                            setCurrentUser({ ..._currentUser });
                            putCachingUserToBrowser(_currentUser);
                        }}
                        onCloseEvent={() => { console.log("onCloseEvent"); router.back() }} />
                </Container>

                Signed in as {session?.user?.email}
            </div>

        </>
    )
}
