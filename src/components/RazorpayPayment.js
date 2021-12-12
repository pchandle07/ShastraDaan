import React from 'react';
import './RazorpayPayment.css';
import { useState } from "react";
import { createRazorpayOrder } from './service';




const RazorpayPayment = ({ name, email, amount, placeId, httpClient }) => {

    const [desc, setDesc] = useState("Donation to ISKCON");
    const [success, setSucess] = useState(false);
    const [failure, setFailure] = useState(false);
    const { get, post, response, loading, error } = httpClient;


    async function displayRazorPay(e) {
        try {
            e.preventDefault();

            setSucess(false);
            setFailure(false);
            const data = await createRazorpayOrder({ post, response }, parseInt(amount), placeId)
    
            console.log(data)
    
            var options = {
                "key": "rzp_test_P6BGdE4VL5vWrU",
                currency: data.currency,
                amount: parseInt(data.amount),
                order_id: data.id,
                "name": name,
                "email": email,
                "image": "https://i.ibb.co/tKRjzCz/logoketto.png",
                "handler": function (response) {
                    console.log("payment successful from handler", response);
                    setSucess(true);
                    setFailure(false);
                },
                "prefill": {
                    "name": name,
                    "email": email,
                },
                "notes": {
                    "address": "Razorpay Corporate Office",
                    "name": name,
                    "email": email,
                },
                "theme": {
                    "color": "#10B981"
                }
    
            };
    
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                console.log("payment failure", response);
                setSucess(false);
                setFailure(true);
            });
            rzp1.on('payment.paid', function (response) {
                console.log("payment sucessful from event", response);
            });
            rzp1.open();
        } catch (err) {
            console.log('error : ', err)
        }
    }


    return (
        <div className="App">
            <div className="form">
                <button
                    className="App-link"
                    onClick={displayRazorPay}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Donate now
                </button>
            </div>
            <div>
                {
                    success ? <div className="success">Payment successful!</div> : <div></div>
                }
            </div>


            <div >

                {
                    failure ? <div className="failure">Payment failed :(</div> : <div></div>
                }
            </div>

            <div>

                {
                    loading ? <div className="loading">...loading</div> : <div></div>
                }
            </div>




        </div>
    );
};

export default RazorpayPayment;
