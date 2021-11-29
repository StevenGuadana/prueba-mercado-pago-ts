import React,{useEffect} from 'react';
import './App.css';

declare const MercadoPago: any;

function AppTS() {

  useEffect(() => {
    if (typeof MercadoPago !== "undefined") {
      const mp = new MercadoPago(
        "TEST-508c3eee-1e2b-4129-a9b4-094f17c4409c"
      );
      const loadCardForm = () => {
        /* const productCost = document.getElementById('amount').value;
        const productDescription = document.getElementById('product-description').innerText;
     */
        const cardForm = mp.cardForm({
            amount: '10',
            autoMount: true,
            form: {
                id: "form-checkout",
                cardholderName: {
                    id: "form-checkout__cardholderName",
                    placeholder: "Holder name",
                },
                cardholderEmail: {
                    id: "form-checkout__cardholderEmail",
                    placeholder: "E-mail",
                },
                cardNumber: {
                    id: "form-checkout__cardNumber",
                    placeholder: "Card number",
                },
                cardExpirationMonth: {
                    id: "form-checkout__cardExpirationMonth",
                    placeholder: "MM",
                },
                cardExpirationYear: {
                    id: "form-checkout__cardExpirationYear",
                    placeholder: "YY",
                },
                securityCode: {
                    id: "form-checkout__securityCode",
                    placeholder: "Security code",
                },
                installments: {
                    id: "form-checkout__installments",
                    placeholder: "Installments",
                },
                identificationType: {
                    id: "form-checkout__identificationType",
                },
                identificationNumber: {
                    id: "form-checkout__identificationNumber",
                    placeholder: "Identification number",
                },
                issuer: {
                    id: "form-checkout__issuer",
                    placeholder: "Issuer",
                },
            },
            callbacks: {
                onFormMounted: (error: any) => {
                    if (error)
                        return console.warn("Form Mounted handling error: ", error);
                    console.log("Form mounted");
                },
            },
            onSubmit: (event: { preventDefault: () => void; }) => {
                event.preventDefault();
                console.log("Se ejecuta onsubmit");
                
                setTimeout(() => {
                  const {
                    paymentMethodId,
                    issuerId,
                    cardholderEmail: email,
                    amount,
                    token,
                    installments,
                    identificationNumber,
                    identificationType,
                } = cardForm.getCardFormData();
    
                fetch("http://localhost:8080/process_payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        issuerId,
                        paymentMethodId,
                        transactionAmount: Number(amount),
                        installments: Number(installments),
                        description: "productDescription",
                        payer: {
                            email,
                            identification: {
                                type: identificationType,
                                number: identificationNumber,
                            },
                        },
                    }),
                })
                    .then(response => {
                      console.log("Entramos",response);
                      
                        return response.json();
                    })
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        alert("Unexpected error\n"+JSON.stringify(error));
                    });
                }, 2000);
            },
            onFetching: (resource: any) => {
              console.log("Fetching resource: ", resource);
        
              // Animate progress bar
              //onst progressBar = document.querySelector(".progress-bar");
              //progressBar.removeAttribute("value");
        
              return () => {
                //progressBar.setAttribute("value", "0");
              };
            },
        });
    };
      console.log("MP",mp);
      loadCardForm();
    }
  }, [])

  return (
    <section className="payment-form dark">
      <div className="container__payment">
          <div className="block-heading">
              <h2>Card Payment</h2>
              <p>This is an example of a Mercado Pago integration</p>
          </div>
          <div className="form-payment">{/* 
              <div className="products">
                  <h2 className="title">Summary</h2>
                  <div className="item">
                      <span className="price" id="summary-price"></span>
                      <p className="item-name">Book x <span id="summary-quantity"></span></p>
                  </div>
                  <div className="total">Total<span className="price" id="summary-total"></span></div>
              </div> */}
              <div className="payment-details">
                  <form id="form-checkout">
                      <h3 className="title">Buyer Details</h3>
                      <div className="row">
                          <div className="form-group col">
                              <input id="form-checkout__cardholderEmail" name="cardholderEmail" type="email" className="form-control"/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="form-group col-sm-5">
                              <select id="form-checkout__identificationType" name="identificationType" className="form-control"></select>
                          </div>
                          <div className="form-group col-sm-7">
                              <input id="form-checkout__identificationNumber" name="docNumber" type="text" className="form-control"/>
                          </div>
                      </div>
                      <br/>
                      <h3 className="title">Card Details</h3>
                      <div className="row">
                          <div className="form-group col-sm-8">
                              <input id="form-checkout__cardholderName" name="cardholderName" type="text" className="form-control"/>
                          </div>
                          <div className="form-group col-sm-4">
                              <div className="input-group expiration-date">
                                  <input id="form-checkout__cardExpirationMonth" name="cardExpirationMonth" type="text" className="form-control"/>
                                  <span className="date-separator">/</span>
                                  <input id="form-checkout__cardExpirationYear" name="cardExpirationYear" type="text" className="form-control"/>
                              </div>
                          </div>
                          <div className="form-group col-sm-8">
                              <input id="form-checkout__cardNumber" name="cardNumber" type="text" className="form-control"/>
                          </div>
                          <div className="form-group col-sm-4">
                              <input id="form-checkout__securityCode" name="securityCode" type="text" className="form-control"/>
                          </div>
                          <div id="issuerInput" className="form-group col-sm-12 hidden">
                              <select id="form-checkout__issuer" name="issuer" className="form-control"></select>
                          </div>
                          <div className="form-group col-sm-12">
                              <select id="form-checkout__installments" name="installments" className="form-control"></select>
                          </div>
                          <div className="form-group col-sm-12">
                              <input type="hidden" id="amount" />
                              <input type="hidden" id="description" />
                              <br/>
                              <button id="form-checkout__submit" type="submit" className="btn btn-primary btn-block">Pay</button>
                              <br/>
                              <p id="loading-message">Loading, please wait...</p>
                              <br/>
                              <a id="go-back" href="/">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" className="chevron-left">
                                      <path fill="#009EE3" id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                                  </svg>
                                  Go back to Shopping Cart
                              </a>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
}

export default AppTS;
