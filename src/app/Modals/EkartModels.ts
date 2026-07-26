export interface OrderTrack {
    id?: number;
    orderId: string;
    trackingNumber?: string;
    customerEmail?: string;
    customerName?: string;
    status: 'PROCESSING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | string;
    carrier?: string;
    estimatedDelivery?: string;
    shippingAddress?: string;
    totalAmount?: number;
    orderDate?: string;
}

export interface ReturnRequest {
    id?: number;
    returnId?: string;
    orderId: string;
    userEmail: string;
    requestType: 'EXCHANGE' | 'RETURN';
    reason: string;
    itemDetails?: string;
    status?: string;
    createdAt?: string;
}

export interface HelpTicket {
    id?: number;
    name: string;
    email: string;
    category: string;
    subject: string;
    message: string;
    status?: string;
    createdAt?: string;
}

export interface ContactMessage {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string;
}
