import { Customer } from './customer';

export interface Scan {
  id: number;
  deadline: string;
  customer: Customer;
  created_at: string;
  image_height: number;
  image_width: number;
  file_type: string;
  dpi: number;
  thumbnail: string;
  is_completed: boolean;
  client_notified: boolean;
  notification_date: string | null;
  final_location: string;
  payment_type: string;
  deposit_made: boolean;
  balance_paid: boolean;
}