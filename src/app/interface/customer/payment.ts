export type TransactionStatus = 'pending' | 'paid' | 'failed' | 'expired' | 'canceled';
export type PaymentType = 'dp' | 'full' | 'remaining';

interface PaymentMethod {
    id: number;
    name: string;
}

interface Payment {
    id: number;
    reservation_id: number;
    transaction_id: string;
    payment_method_id: number;
    transaction_status: TransactionStatus;
    payment_type: string;
    type: PaymentType;
}

export type {PaymentMethod, Payment}