"use client";

import { Sidebar} from "flowbite-react";
import Image from 'next/image';
import { BiBuoy } from "react-icons/bi";
import { HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function Dashboard() {
  return (
    
    <Sidebar>
      <img src="https://images.squarespace-cdn.com/content/v1/5a8749aff09ca4823e25c813/1582321464833-N5TD3V5GOWYXVCLKZK3A/Umi+Logo.png"/>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item href="/" icon={HiChartPie} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                Dashboard
                </Sidebar.Item>

                <Sidebar.Collapse icon={HiShoppingBag} label="New">
                    <Sidebar.Item href="#">Frame</Sidebar.Item>
                    <Sidebar.Item href="#">Print</Sidebar.Item>
                    <Sidebar.Item href="#">Scan</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item href="#" icon={HiViewBoards}>
                Active Orders
                </Sidebar.Item>
                <Sidebar.Item href="/frames" icon={HiInbox}>
                Frames
                </Sidebar.Item>
                <Sidebar.Item href="/prints" icon={HiUser}>
                Prints
                </Sidebar.Item>
                <Sidebar.Item href="/scans" icon={HiShoppingBag}>
                Scans
                </Sidebar.Item>
                <Sidebar.Item href="/customers" icon={HiUser}>
                Customers
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                Archive
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                Sign Up
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiViewBoards}>
                Settings
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={BiBuoy}>
                Help
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  );
  
}