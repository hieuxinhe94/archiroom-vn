import { Avatar, Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { Elements, PaymentElement, useElements,useStripe } from '@stripe/react-stripe-js';
import { loadStripe,Stripe } from '@stripe/stripe-js';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SessionProvider,signIn, signOut, useSession } from "next-auth/react"
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";

import Layout from "./Layout";

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};


export default function PaymentGate(props) {
  
  
  const { data: session } = useSession()
  const router = useRouter()
  const [amount, setAmount] = useState(0);

  React.useEffect(() => {
    const _amount = router.query.amount;
    
    
    setAmount(_amount)
  }, [router, amount]);

  return (
    <Layout>
      <NextSeo
        title={`${"Complete to TryOnHub.AI"}`}
        description={"" || ""}

        canonical={`/biz-registration`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="relative flex min-h-dvh flex-col  bg-radial" id="app-container">
        {amount &&
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm cost={amount} />
          </Elements>
        }
      </div>
    </Layout>

  );

}

const CheckoutForm = ({ props, cost }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amountDollar, setAmountDollar] = useState(cost);
  const [errorMessage, setErrorMessage] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center  h-screen justify-center p-4">
        <div className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-full max-w-[400px]" >
          <div className="p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
            <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground rounded-full h-12 w-12 translate-y-12">
              <img src="/favicon.ico" className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />
            </span>
          </div>
          <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-4">
            <div className="pb-4 pt-6">
              <p className="text-xl font-medium">Payment checkout to continue process this album.</p>
              <p className="max-w-[90%] text-small text-default-400">TryOnHub.AI.</p>
            </div>
            <div data-slot="base" className="inline-flex">
              <div data-slot="tabList" className="flex p-1 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-100 rounded-medium" id="react-aria5978686204-:r0:" role="tablist" aria-orientation="horizontal">
                <button data-slot="tab" data-key="one-time-payment" id="react-aria5978686204-:r0:-tab-one-time-payment" aria-selected="true" role="tab"
                  className="z-0 w-full  px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small" type="button" data-selected="true" aria-controls="react-aria5978686204-:r0:-tabpanel-one-time-payment">
                  <span className="absolute z-0 inset-0 rounded-small bg-indigo-800 dark:bg-default shadow-small" data-slot="cursor" ></span>
                  <div className="relative z-10 px-12 whitespace-nowrap  text-white " data-slot="tabContent">
                    {amountDollar} $
                  </div>
                </button>
                <button data-slot="tab" data-key="subscription" id="react-aria5978686204-:r0:-tab-subscription" aria-selected="false" role="tab" className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small" type="button">
                  <div className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-default-foreground" data-slot="tabContent">
                    One-time payment
                  </div>
                </button>
              </div>
            </div>
            <span aria-hidden="true" className="w-px h-px block" ></span>
            <div className="py-4">
              <PaymentElement className="text-white" options={options} />
            </div>
            <div className="p-3 h-auto flex w-full overflow-hidden color-inherit subpixel-antialiased rounded-b-large items-center justify-center gap-1 pb-5">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-default-300 iconify iconify--solar" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2c-.811 0-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082M15.06 10.5a.75.75 0 0 0-1.12-.999l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" clipRule="evenodd"></path>
              </svg>
              <p className="text-small text-default-300">Payments are secure and encrypted.</p>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
