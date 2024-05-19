import { Customer } from './customer';

export interface Print {
  id: number;
  deadline: string;
  customer: Customer;
  created_at: string;
  image_height: number;
  image_width: number;
  paper_height: number;
  paper_width: number;
  thumbnail: string;
  print_style: string;
  quantity: number;
  job_notes: string;
}