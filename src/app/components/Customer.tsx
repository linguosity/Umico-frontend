'use client';

import { Card, Table, Tabs, List, Checkbox, Label, Accordion, ListGroup} from 'flowbite-react';
import Image from 'next/image';
import { Customer } from '../types/customer';
import { Print } from '../types/print';
import { Scan } from '../types/scan';
import { Frame } from '../types/frames';
import Link from 'next/link'
import { HiAdjustments, HiClipboardList, HiUserCircle, HiPlusCircle, HiUserRemove } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import AddFrame from '../components/AddFrame';
import AddScan from '../components/AddScan';
import AddPrint from '../components/AddPrint';
import CustomerCard from '../components/CustomerCard';

interface CustomerPageProps {
    customerData: Customer;
    prints: Print[] | null;
    scans: Scan[] | null;
    frames: Frame[] | null;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customerData, prints, scans, frames }) => {
   
    return (
        <>

            <CustomerCard customer={customerData}/>
        <Tabs>
        <Tabs.Item active title="Frames" icon={HiUserCircle}>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Deadline</Table.HeadCell>
                    <Table.HeadCell>Thumbnail</Table.HeadCell>
                    <Table.HeadCell>Job Status</Table.HeadCell>
                    <Table.HeadCell>Payment Status</Table.HeadCell>
                    <Table.HeadCell>Image </Table.HeadCell>
                    <Table.HeadCell>Frame </Table.HeadCell>
                    <Table.HeadCell>Moulding</Table.HeadCell>
                    <Table.HeadCell>Mat Ply</Table.HeadCell>
                    <Table.HeadCell>Mat Window</Table.HeadCell>
                    <Table.HeadCell>Notification Date</Table.HeadCell>
                    <Table.HeadCell>Final Location</Table.HeadCell>
                    <Table.HeadCell>Payment Type</Table.HeadCell>
                    
                    <Table.HeadCell>Edit</Table.HeadCell>
                
                </Table.Head>
                <Table.Body className="divide-y">

                { frames?.map((frame) => (
                        
                    <Table.Row key={frame.id} >
                        <Table.Cell>{frame.deadline ? new Date(frame.deadline).toLocaleString() : 'N/A'}</Table.Cell>

                        <Table.Cell><img src={frame.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                        <Table.Cell>
                            <div className="flex max-w-md flex-col gap-4" id="checkbox">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_window" checked={frame.is_completed} disabled/>
                                    <Label htmlFor="accept" className="flex">
                                        completed
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_double" checked={frame.client_notified} disabled/>
                                    <Label htmlFor="promotion">
                                        client notified
                                    </Label>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex max-w-md flex-col gap-4" id="checkbox">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_window" checked={frame.deposit} disabled/>
                                    <Label htmlFor="accept" className="flex">
                                        deposit
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_double" checked={frame.balance_paid} disabled/>
                                    <Label htmlFor="promotion">
                                        balance paid
                                    </Label>
                                </div>
                            </div>
                        </Table.Cell>
                        <Table.Cell>{frame.image_height} x {frame.image_width}</Table.Cell>
                        
                        <Table.Cell>{frame.frame_height} x {frame.frame_width}</Table.Cell>
                    
                        <Table.Cell>{frame.moulding}</Table.Cell>
                        <Table.Cell>{frame.mat} {frame.mat_ply}</Table.Cell>
                        
                        <Table.Cell>
                            <div className="flex max-w-md flex-col gap-4" id="checkbox">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_window" checked={frame.mat_window} disabled/>
                                    <Label htmlFor="accept" className="flex">
                                        window
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mat_double" checked={frame.mat_double} disabled/>
                                    <Label htmlFor="promotion">
                                        double
                                    </Label>
                                </div>
                            </div>
                        </Table.Cell>
                        
                        <Table.Cell>{frame.notification_date ? new Date(frame.notification_date).toLocaleString() : 'N/A'}</Table.Cell>
                        <Table.Cell>{frame.final_location}</Table.Cell>
                        <Table.Cell>{frame.payment_type}</Table.Cell>
                        
                        <Table.Cell>
                            <Link href={`${customerData.id}/frames/${frame.id}?editMode=true`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit 
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                            
                ))}
                </Table.Body>
            </Table>
        </Tabs.Item>
        <Tabs.Item title="Prints" icon={MdDashboard}>
            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Deadline</Table.HeadCell>
                                    <Table.HeadCell>Image Height</Table.HeadCell>
                                    <Table.HeadCell>Image Width</Table.HeadCell>
                                    <Table.HeadCell>Paper Height</Table.HeadCell>
                                    <Table.HeadCell>Paper Width</Table.HeadCell>
                                    <Table.HeadCell>Print Style</Table.HeadCell>
                                    <Table.HeadCell>Quantity</Table.HeadCell>
                                    <Table.HeadCell>Job Notes</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
            { prints?.map((print) => (
                        
                                <Table.Row key={print.id}>
                                    <Table.Cell>{print.deadline ? new Date(print.deadline).toLocaleString() : 'N/A'}</Table.Cell>
                                    <Table.Cell>{print.image_height}</Table.Cell>
                                    <Table.Cell>{print.image_width}</Table.Cell>
                                    <Table.Cell>{print.paper_height}</Table.Cell>
                                    <Table.Cell>{print.paper_width}</Table.Cell>
                                    <Table.Cell>{print.print_style}</Table.Cell>
                                    <Table.Cell>{print.quantity}</Table.Cell>
                                    <Table.Cell>{print.job_notes}</Table.Cell>
                                    <Table.Cell>
                                        <Link href={`${customerData.id}/prints/${print.id}?editMode=true`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit 
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                   
            ))}

            </Table.Body>
            </Table>
            
            
        </Tabs.Item>

        <Tabs.Item title="Scans" icon={HiAdjustments}>

            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Deadline</Table.HeadCell>
                                    <Table.HeadCell>Image Height</Table.HeadCell>
                                    <Table.HeadCell>Image Width</Table.HeadCell>
                                    <Table.HeadCell>File Type</Table.HeadCell>
                                    <Table.HeadCell>DPI</Table.HeadCell>
                                    <Table.HeadCell>Thumbnail</Table.HeadCell>
                                    <Table.HeadCell>Is Completed</Table.HeadCell>
                                    <Table.HeadCell>Client Notified</Table.HeadCell>
                                    <Table.HeadCell>Notification Date</Table.HeadCell>
                                    <Table.HeadCell>Final Location</Table.HeadCell>
                                    <Table.HeadCell>Payment Type</Table.HeadCell>
                                    <Table.HeadCell>Deposit Made</Table.HeadCell>
                                    <Table.HeadCell>Balance Paid</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
            { scans?.map((scan) => (
                    
                                    <Table.Row key={scan.id}>
                                    <Table.Cell>{scan.deadline? new Date(scan.deadline).toLocaleString() : 'N/A'}</Table.Cell>    
                                    <Table.Cell>{scan.image_height}</Table.Cell>
                                    <Table.Cell>{scan.image_width}</Table.Cell>
                                    <Table.Cell>{scan.file_type}</Table.Cell>
                                    <Table.Cell>{scan.dpi}</Table.Cell>
                                    <Table.Cell><img src={scan.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                                    <Table.Cell>{scan.is_completed ? 'Yes' : 'No'}</Table.Cell>
                                    <Table.Cell>{scan.client_notified ? 'Yes' : 'No'}</Table.Cell>
                                    <Table.Cell>{scan.notification_date ? new Date(scan.notification_date).toLocaleString() : 'N/A'}</Table.Cell>
                                    <Table.Cell>{scan.final_location}</Table.Cell>
                                    <Table.Cell>{scan.payment_type}</Table.Cell>
                                    <Table.Cell>{scan.deposit ? 'Yes' : 'No'}</Table.Cell>
                                    <Table.Cell>{scan.balance_paid ? 'Yes' : 'No'}</Table.Cell>
                                    <Table.Cell>
                                        <Link href={`${customerData.id}/scans/${scan.id}?editMode=true`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit 
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                ))}
                </Table.Body>
            </Table>
            
        </Tabs.Item>
        </Tabs>
        
        </>
    );
};

export default CustomerPage;
