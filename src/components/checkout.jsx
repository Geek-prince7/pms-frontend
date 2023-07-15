const handleSubmit = (event) => {
    event.preventDefault();
  
    // Retrieve form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const address = formData.get('address');
  
    // Perform actions with the form data
    // Example: Make an API request or save order details
    console.log('Name:', name);
    console.log('Address:', address);
    window.location.href='/home'
  };
  
  const Checkout = () => {
    return (
        <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
  
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" required />
  
          
  
          <button type="submit">Place Order</button>
        </form>
      </div>
    );
  };
  