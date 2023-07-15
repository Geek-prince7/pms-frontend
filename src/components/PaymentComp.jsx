import { PayPalButtons } from "@paypal/react-paypal-js";

const PaymentComponent = () => {
  // Handle successful payment
  const onSuccess = (details, data) => {
    console.log("Payment succeeded", details, data);
  };

  // Handle cancelation or failure
  const onCancelOrError = (error) => {
    console.error("Payment canceled or failed", error);
  };

  return (
    <div>
      {/* Your other content */}
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Example amount
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details, data);
          });
        }}
        onError={onCancelOrError}
        onCancel={onCancelOrError}
      />
    </div>
  );
};

export default PaymentComponent;
