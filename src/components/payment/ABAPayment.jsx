import { Alert, AlertTitle } from "@mui/material";

const ABAPayment = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>ABA Unavailable</AlertTitle>
        ABA payment is unavailable. Please use another payment method.
      </Alert>
    </div>
  );
};

export default ABAPayment;
