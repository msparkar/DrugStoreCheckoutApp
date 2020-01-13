import { Product } from './Product';
import { User } from './User';

export class OrderHistory {
    product:Product;
    user: User;
    quantityOrdered: number;
    purchaseDate: Date;
}