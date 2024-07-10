"use client";

import { Table, Badge, Modal, Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Print } from "../types/print";
import { Scan } from "../types/scan";
import { Frame } from "../types/frames";
import { Misc } from "../types/misc";
import EditCustomer from "./EditCustomer";
import EditFrame from "./EditFrame";
import EditScan from "./EditScan";
import EditPrint from "./EditPrint";
import EditMisc from "./EditMisc";

export default function Home() {

  type AllJobTypes = Frame | Misc | Print | Scan;

  interface BaseJob {
    type: 'frame' | 'misc' | 'print' | 'scan';
    id: number;
    created_at: string;
    is_completed: boolean;
    client_notified: boolean;
    notification_date: string | null;
    deposit: boolean;
    balance_paid: boolean;
  }

  type Job = BaseJob & Partial<AllJobTypes>;

  interface Address {
    id: number; // This represents the primary key
    customer: number; // ForeignKey relation to Customer
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  }

  interface Customer {
    id: number; // This represents the primary key
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    shipping_addresses: Address[];
    prints?: Print[];
    scans?: Scan[];
    frames?: Frame[];
    misc?: Misc[]; // Add this line
  }

  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const getCustomerData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });

      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }

      const customerData: Customer[] = await res.json();
      setCustomerList(customerData);
      console.log(customerData);

    } catch (err) {
      console.log('error fetching customer data', err)
    }
  }

  const onRefresh = async () => {
    await getCustomerData();
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const closeEditModal = () => {
    setSelectedJob(null);
    setOpenModal(false);
  };

  
  const getCustomerJobs = (customer: Customer): Job[] => {
    const jobs: Job[] = [];
  
    if (customer.prints) {
      customer.prints.forEach((print) => {
        jobs.push({
          type: 'print',
          id: print.id,
          created_at: print.created_at,
          is_completed: print.is_completed,
          client_notified: print.client_notified,
          notification_date: print.notification_date,
          deposit: print.deposit,
          balance_paid: print.balance_paid,
        });
      });
    }
  
    if (customer.scans) {
      customer.scans.forEach((scan) => {
        jobs.push({
          type: 'scan',
          id: scan.id,
          created_at: scan.created_at,
          is_completed: scan.is_completed,
          client_notified: scan.client_notified,
          notification_date: scan.notification_date,
          deposit: scan.deposit,
          balance_paid: scan.balance_paid,
        });
      });
    }
  
    if (customer.frames) {
      customer.frames.forEach((frame) => {
        jobs.push({
          type: 'frame',
          id: frame.id,
          created_at: frame.created_at,
          is_completed: frame.is_completed,
          client_notified: frame.client_notified,
          notification_date: frame.notification_date,
          deposit: frame.deposit,
          balance_paid: frame.balance_paid,
        });
      });
    }
  
    if (customer.misc) {
      customer.misc.forEach((misc) => {
        jobs.push({
          type: 'misc',
          id: misc.id,
          created_at: misc.created_at,
          is_completed: misc.is_completed,
          client_notified: misc.client_notified,
          notification_date: misc.notification_date,
          deposit: misc.deposit,
          balance_paid: misc.balance_paid,
        });
      });
    }
  
    return jobs;
  };
  

  return (
    <div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-[5%]"></Table.HeadCell>
            <Table.HeadCell className="w-[25%]">Customer</Table.HeadCell>
            <Table.HeadCell className="w-[20%]">Order Date</Table.HeadCell>
            <Table.HeadCell className="w-[15%]">Order</Table.HeadCell>
            <Table.HeadCell className="w-[35%]">Status</Table.HeadCell>
          </Table.Head>
            <Table.Body className="divide-y">
              {customerList.map((customer, idx) => {
                const jobs = getCustomerJobs(customer);
                return jobs.map((job, jobIdx) => (
                  <Table.Row key={`${idx}-${jobIdx}`}>
                    <Table.Cell className="w-[5%]">
                      <Link href={'#'} onClick={() => openEditModal(job)}>
                        <span className="text-blue-400">
                          <svg className="w-6 h-6 hover:text-gray-800 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                          </svg>
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="w-[25%]">{customer.last_name}, {customer.first_name}</Table.Cell>
                    <Table.Cell className="w-[20%]">{new Date(job.created_at).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className="w-[15%]">{job.type}</Table.Cell>
                    <Table.Cell className="w-[35%]">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id={`completed-${idx}-${jobIdx}`} checked={job.is_completed} readOnly disabled />
                          <Label htmlFor={`completed-${idx}-${jobIdx}`} className="text-xs">Completed</Label>
                      
                          <Checkbox id={`notified-${idx}-${jobIdx}`} checked={job.client_notified} readOnly disabled/>
                          <Label htmlFor={`notified-${idx}-${jobIdx}`} className="text-xs">Client Notified</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id={`deposit-${idx}-${jobIdx}`} checked={job.deposit} readOnly disabled/>
                          <Label htmlFor={`deposit-${idx}-${jobIdx}`} className="text-xs">Deposit</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id={`balance-${idx}-${jobIdx}`} checked={job.balance_paid} readOnly disabled/>
                          <Label htmlFor={`balance-${idx}-${jobIdx}`} className="text-xs">Balance Paid</Label>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ));
              })}
            </Table.Body>
          </Table>
        </div>
        <Modal
          dismissible
          show={openModal}
          size={'xlg'}
          onClose={closeEditModal}
          className={`bg-transparent backdrop-blur-sm`}
        >
          {selectedJob && selectedJob.type === 'print' && <EditPrint print={selectedJob as Print} onRefresh={onRefresh}/>}
          {selectedJob && selectedJob.type === 'scan' && <EditScan scan={selectedJob as Scan} onRefresh={onRefresh} />}
          {selectedJob && selectedJob.type === 'frame' && <EditFrame frame={selectedJob as Frame} onRefresh={onRefresh} />}
          {selectedJob && selectedJob.type === 'misc' && <EditMisc misc={selectedJob as Misc} onRefresh={onRefresh} />}
        </Modal>
      </div>
    </div>
  );
}