"use client";

import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import Image from 'next/image';
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiSearch,
} from "react-icons/hi";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="text-center z-30">
        <button onClick={() => setIsOpen(true)} className="text-white bg-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="blue" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>
      </div>
      <Drawer edge open={isOpen} onClose={handleClose} className="isolate custsom-drawer bg-white">
        <Drawer.Header/>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiChartPie} className="flex items-center p-2 text-[rgb(31,107,151)] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="/frames" icon={HiInbox} onClick={handleClose} className="text-[rgb(31,107,151)]">
                      Frames
                    </Sidebar.Item>
                    <Sidebar.Item href="/prints" icon={HiUser} onClick={handleClose}  className="text-[rgb(31,107,151)]">
                      Prints
                    </Sidebar.Item>
                    <Sidebar.Item href="/scans" icon={HiShoppingBag} onClick={handleClose} className="text-[rgb(31,107,151)]">
                      Scans
                    </Sidebar.Item>
                    <Sidebar.Item href="/customers" icon={HiUser} onClick={handleClose} className="text-[rgb(31,107,151)]">
                      Customers
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
