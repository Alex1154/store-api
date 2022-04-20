export type paymentResponseType = {
  message: string;
  payment: {
    paymentId: string;
    userId: string;
    cardNumber: string;
    total: number;
  };
};
