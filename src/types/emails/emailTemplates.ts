export const newMessageAlert = (email: string) => {
  return {
    from: 'ninjakitchenglobe@gmail.com',
    to: email,
    subject: 'You just received a message',
    html: `<main
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      <div
        style="
          background-color: #00000;
          color: white;
          padding: 10px;
          margin-bottom: 40px;
        "
      >
        <h1 style="text-align: center"> Ninjakit </h1>
      </div>

      <div style="text-align: center">
        <p>
        You just received a message on Ninjakitchenglobal
        </p>

        <div style="text-align: center; width: 200px; margin: 50px auto;">
    
          <p> Head on to https://www.ninjakitchenglobal.com/purchases-list to see what it is about  <p/>
        </div>
      </div>
    </main>
`,
  };
};

export const newPotentialPurchaseAlert = (email: string) => {
  return {
    from: 'ninjakitchenglobe@gmail.com',
    to: email,
    subject: 'You just received a message',
    html: `<main
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      <div
        style="
          background-color: #00000;
          color: white;
          padding: 10px;
          margin-bottom: 40px;
        "
      >
        <h1 style="text-align: center"> Ninjakit </h1>
      </div>

      <div style="text-align: center">
        <p>
        You just received a message on Ninjakitchenglobal a customer wants to buy kitchenware
        </p>

        <div style="text-align: center; width: 200px; margin: 50px auto;">
    
          <p> Head on to https://www.ninjakitchenglobal.com/purchases-list to see what it is about  <p/>
        </div>
      </div>
    </main>
`,
  };
};

export const buyerPurchaseEmail = (
  email: string,
  orderNumber: number,
  address: string,
) => {
  return {
    from: 'ninjakitchenglobe@gmail.com',
    to: email,
    subject: `Order confirmation for ${orderNumber}`,
    html: `<main
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      <div
        style="
          background-color: #00000;
          color: white;
          padding: 10px;
          margin-bottom: 40px;
        "
      >
        <h1 style="text-align: center"> Ninjakit </h1>
      </div>

      <div style="text-align: center">
        <p>
      Thank you for purchasing Ninja products. We will contact you within 1 business day to confirm your order details, so please keep your phone accessible. If you do not receive a confirmation call within two business days, please reach out to our customer service with a picture of your purchase receipt. It’s possible that your order was overlooked, or your excellent purchase history allowed for automatic confirmation to expedite the process.
We will notify you via email once your package is shipped, so please check your inbox.
        </p>

        <div style="text-align: center; width: 200px; margin: 50px auto;">
      <h2>Order details</h2>
        <ul>
          <li> Email: ${email} </li>
          <li> Shipping address: ${address} </li>
        </ul>
        </div>
      </div>
    </main>
`,
  };
};

export const sellerPurchaseEmail = (
  email: string,
  address: string,
  orderNumber: number,
) => {
  return {
    from: 'ninjakitchenglobe@gmail.com',
    to: email,
    subject: `New Purchase ${orderNumber}`,
    html: `<main
      style="
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      "
    >
      <div
        style="
          background-color: #00000;
          color: white;
          padding: 10px;
          margin-bottom: 40px;
        "
      >
        <h1 style="text-align: center"> Ninjakit </h1>
      </div>

      <div style="text-align: center">
        <p>
      A customer just made a purchase
        </p>

        <div style="text-align: center; width: 200px; margin: 50px auto;">
      <h2>Order details</h2>
        <ul>
          <li> Email: ${email} </li>
          <li> Shipping address: ${address} </li>
        </ul>
        </div>
      </div>
    </main>
`,
  };
};
