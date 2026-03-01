const newMessageAlert = (email: string) => {
  return {
    from: 'ninjakitonline@gmail.com',
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
        You just received a message on Ninjakitchentools
        </p>

        <div style="text-align: center; width: 200px; margin: 50px auto;">
    
          <p> Head on to https://ninja-kit.vercel.app/purchases-list to see what it is about  <p/>
        </div>
      </div>
    </main>
`,
  };
};

export default newMessageAlert;
