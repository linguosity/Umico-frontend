import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMisc } from '../api/miscOperations';
import { Misc } from '../types/misc';
import { Customer } from '../types/customer';
import { Card, Button, Label, TextInput, Textarea, Checkbox, Datepicker } from 'flowbite-react';

interface AddMiscProps {
  id: number;
}

const AddMisc: React.FC<AddMiscProps> = ({ id }) => {
  const [form, setForm] = useState<Partial<Misc>>({
    customer: { id } as Customer,
    deadline: '',
    job_notes: '',
    is_completed: false,
    client_notified: false,
    notification_date: null,
    final_location: '',
    payment_type: '',
    deposit: false,
    balance_paid: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDateChange = (date: Date | undefined, name: string) => {
    if (date) {
      setForm(prevForm => ({
        ...prevForm,
        [name]: date.toISOString(),
      }));
    }
  };

  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form) {
        try {
            const adjustedData = {
                ...form,
                notification_date: form.notification_date ? new Date(form.notification_date).toISOString() : null,
                deadline: form.deadline ? new Date(form.deadline).toISOString() : "",
            };

            // Remove customer property if it exists
            const { customer, ...dataWithoutCustomer } = adjustedData;

            await createMisc(dataWithoutCustomer as Misc, id ?? 0, router);
            router.push('/'); // Redirect to home page or wherever you want after successful submission
        } catch (error) {
            console.error('Failed to create the misc item:', error);
        }
    }
};

  return (
    <Card>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="deadline" value="Deadline" />
          </div>
          <Datepicker
            id="deadline"
            name="deadline"
            onChange={handleChange} 
            datepicker-format="yyyy/MM/dd" 
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="job_notes" value="Job Notes" />
          </div>
          <Textarea
            id="job_notes"
            name="job_notes"
            value={form.job_notes}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="is_completed"
            name="is_completed"
            checked={form.is_completed}
            onChange={handleChange}
          />
          <Label htmlFor="is_completed">Completed</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="client_notified"
            name="client_notified"
            checked={form.client_notified}
            onChange={handleChange}
          />
          <Label htmlFor="client_notified">Client Notified</Label>
        </div>

        {form.client_notified && (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="notification_date" value="Notification Date" />
            </div>
            <Datepicker
              id="notification_date"
              name="notification_date"
              onChange={handleChange} 
              datepicker-format="yyyy/MM/dd" 
            />
          </div>
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="final_location" value="Final Location" />
          </div>
          <TextInput
            id="final_location"
            name="final_location"
            value={form.final_location}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="payment_type" value="Payment Type" />
          </div>
          <TextInput
            id="payment_type"
            name="payment_type"
            value={form.payment_type}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="deposit"
            name="deposit"
            checked={form.deposit}
            onChange={handleChange}
          />
          <Label htmlFor="deposit">Deposit Received</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="balance_paid"
            name="balance_paid"
            checked={form.balance_paid}
            onChange={handleChange}
          />
          <Label htmlFor="balance_paid">Balance Paid</Label>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default AddMisc;