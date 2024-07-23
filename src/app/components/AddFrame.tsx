'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Datepicker, Select } from 'flowbite-react';
import { Frame as FrameType } from '../types/frames';
import { createFrame } from '../api/frameOperations';

interface EditFrameProps {
    id: number | null;
}

const AddFrame: React.FC<EditFrameProps> = ({ id }) => {
    const [straightToFrame, setStraightToFrame] = useState(false);
    const [showFloat, setShowFloat] = useState(false);
    const [showWindowMat, setShowWindowMat] = useState(false);
    const [showCanvasFloat, setShowCanvasFloat] = useState(false);

    const [form, setForm] = useState<Partial<FrameType>>({
        id: 0,
        deadline: new Date().toISOString(),
        created_at: new Date().toISOString(),
        image_height: 0,
        image_width: 0,
        frame_height: 0,
        frame_width: 0,
        moulding: '',
        moulding_number: BigInt("0"),
        mat: '',
        mat_number: BigInt("0"),
        mat_ply: '4-ply',
        mat_window: false,
        mat_double: false,
        mat_in_visible: 0,
        mat_in_total: 0,
        mat_inside_height: 0,
        mat_inside_width: 0,
        mat_outside_height: 0,
        mat_outside_width: 0,
        float_type: 'raised',
        float_in_visible: 0,
        float_in_total: 0,
        glazing: '',
        thumbnail: 'https://dummyimage.com/50x50/000000/fff.png',
        glazing_type: '',
        spacers: false,
        spacers_type: '',
        canvas_floater: 0,
        straight_to_frame: false,
        art_location: '',
        art_condition: '',
        is_completed: false,
        client_notified: false,
        notification_date: null,
        final_location: '',
        payment_type: '',
        deposit: false,
        balance_paid: false,
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value;

        console.log(`handleChange called with name: ${name}, value: ${value}, type: ${type}, newValue: ${newValue}`);


        if (name === 'straight_to_frame') {
            setStraightToFrame(newValue as boolean);
        } else if (name === 'showFloat') {
            console.log(`Setting showFloat to ${newValue}`);
            setShowFloat(newValue as boolean);
        } else if (name === 'mat_window') {
            setShowWindowMat(newValue as boolean);
        } else if (name === 'canvas_floater') {
            setShowCanvasFloat(newValue as boolean);
        }

        setForm(prevForm => {
            console.log(`Updating form state for ${name} to ${newValue}`);
            return {
                ...prevForm,
                [name]: newValue
            };
        });

    console.log(`Current state after update: straightToFrame: ${straightToFrame}, showFloat: ${showFloat}, showWindowMat: ${showWindowMat}, showCanvasFloat: ${showCanvasFloat}`);

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                const adjustedData = {
                    ...form,
                    spacers: form.spacers === true,
                    notification_date: form.notification_date ? new Date(form.notification_date).toISOString() : null,
                    deadline: form.deadline ? new Date(form.deadline).toISOString() : "",
                };

                const { customer, ...dataWithoutCustomer } = adjustedData;
                console.log("customer", customer);
                console.log("data without customer", dataWithoutCustomer);

                await createFrame(dataWithoutCustomer as FrameType, id ?? 0, router);
                router.push('/');
            } catch (error) {
                console.error('Failed to create the frame:', error);
            }
        }
    };

    console.log(`Rendering with state: straightToFrame: ${straightToFrame}, showFloat: ${showFloat}, showWindowMat: ${showWindowMat}, showCanvasFloat: ${showCanvasFloat}`);

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                    <h1 className="text-3xl font-bold text-white">Add New Frame</h1>
                </div>
                <form onSubmit={handleSubmit} className="p-8">
                    {/* Step 1: Basic Information */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 1: Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">Deadline</Label>
                                <Datepicker 
                                    onChange={handleChange} 
                                    datepicker-format="yyyy/MM/dd" 
                                    name="deadline" 
                                    id="deadline" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">Upload Image</Label>
                                <FileInput 
                                    id="thumbnail" 
                                    onChange={handleChange} 
                                    name="thumbnail" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="image_dimensions" className="block text-sm font-medium text-gray-700 mb-2">Image Dimensions (W x H)</Label>
                                <div className="flex items-center space-x-2">
                                    <TextInput 
                                        id="image_width" 
                                        onChange={handleChange} 
                                        name="image_width" 
                                        type="number" 
                                        placeholder="Width" 
                                        className="w-1/2 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                    />
                                    <span className="text-gray-500">x</span>
                                    <TextInput 
                                        id="image_height" 
                                        onChange={handleChange} 
                                        name="image_height" 
                                        type="number" 
                                        placeholder="Height" 
                                        className="w-1/2 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="frame_dimensions" className="block text-sm font-medium text-gray-700 mb-2">Frame Dimensions (W x H)</Label>
                                <div className="flex items-center space-x-2">
                                    <TextInput 
                                        name="frame_width" 
                                        onChange={handleChange} 
                                        id="width" 
                                        type="number" 
                                        placeholder="Width" 
                                        className="w-1/2 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                    />
                                    <span className="text-gray-500">x</span>
                                    <TextInput 
                                        name="frame_height" 
                                        onChange={handleChange} 
                                        id="height" 
                                        type="number" 
                                        placeholder="Height" 
                                        className="w-1/2 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Step 2: Frame Options */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 2: Frame Options</h2>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <div className="flex flex-wrap justify-between items-center mb-6">
                                <div className="flex items-center mb-4 mr-6">
                                    <Checkbox 
                                        id="straight_to_frame" 
                                        onChange={handleChange} 
                                        name="straight_to_frame" 
                                        checked={straightToFrame}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="straight_to_frame" className="ml-2 text-gray-700">Straight to Frame</Label>
                                </div>
                                <div className="flex items-center mb-4 mr-6">
                                    <Checkbox 
                                        id="float" 
                                        onChange={handleChange} 
                                        name="showFloat" 
                                        checked={showFloat}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="float" className="ml-2 text-gray-700">Float</Label>
                                </div>
                                <div className="flex items-center mb-4 mr-6">
                                    <Checkbox 
                                        id="mat_window" 
                                        onChange={handleChange} 
                                        name="mat_window" 
                                        checked={showWindowMat}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="mat_window" className="ml-2 text-gray-700">Window Mat</Label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <Checkbox 
                                        id="canvas_floater" 
                                        onChange={handleChange} 
                                        name="canvas_floater" 
                                        checked={showCanvasFloat}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="canvas_floater" className="ml-2 text-gray-700">Canvas Floater</Label>
                                </div>
                            </div>
    
                            {/* Conditional Sections */}
                            {straightToFrame && (
                                <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Straight to Frame Options</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="glazing" className="block text-sm font-medium text-gray-700 mb-2">Glazing</Label>
                                            <Select 
                                                id="glazing" 
                                                name="glazing" 
                                                onChange={handleChange}
                                                className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            >
                                                <option value="">Select Glazing</option>
                                                <option value="regular_glass">Regular Glass</option>
                                                <option value="non_glare_glass">Non-Glare Glass</option>
                                                <option value="museum_glass">Museum Glass</option>
                                                <option value="plexiglass">Plexiglass</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="spacers" className="block text-sm font-medium text-gray-700 mb-2">Spacers</Label>
                                            <Select 
                                                id="spacers" 
                                                name="spacers" 
                                                onChange={handleChange}
                                                className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            >
                                                <option value="">Select Spacers</option>
                                                <option value="none">None</option>
                                                <option value="regular">Regular</option>
                                                <option value="archival">Archival</option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
    
                            {!straightToFrame && (
                                <>
                                    {showFloat && (
                                        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Float Options</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="float_in_visible" className="block text-sm font-medium text-gray-700 mb-2">Visible (in)</Label>
                                                    <TextInput 
                                                        id="float_in_visible" 
                                                        onChange={handleChange} 
                                                        name="float_in_visible" 
                                                        placeholder="e.g., 0.25" 
                                                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="float_in_total" className="block text-sm font-medium text-gray-700 mb-2">Total (in)</Label>
                                                    <TextInput 
                                                        id="float_in_total" 
                                                        onChange={handleChange} 
                                                        name="float_in_total" 
                                                        placeholder="e.g., 2.5" 
                                                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
    
                                    {showWindowMat && (
                                        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Window Mat Options</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="mat_number" className="block text-sm font-medium text-gray-700 mb-2">Mat Number</Label>
                                                    <TextInput 
                                                        name="mat_number" 
                                                        onChange={handleChange} 
                                                        id="mat_number" 
                                                        placeholder="e.g., M123" 
                                                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="mat_ply" className="block text-sm font-medium text-gray-700 mb-2">Mat Ply</Label>
                                                    <div className="flex justify-between">
                                                        <div className="flex items-center">
                                                            <Radio 
                                                                id="mat_ply_2" 
                                                                onChange={handleChange} 
                                                                name="mat_ply" 
                                                                value="2-ply"
                                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <Label htmlFor="mat_ply_2" className="ml-2 text-sm text-gray-700">2-ply</Label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Radio 
                                                                id="mat_ply_4" 
                                                                onChange={handleChange} 
                                                                name="mat_ply" 
                                                                value="4-ply"
                                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <Label htmlFor="mat_ply_4" className="ml-2 text-sm text-gray-700">4-ply</Label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Radio 
                                                                id="mat_ply_8" 
                                                                onChange={handleChange} 
                                                                name="mat_ply" 
                                                                value="8-ply"
                                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <Label htmlFor="mat_ply_8" className="ml-2 text-sm text-gray-700">8-ply</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="mat_in_visible" className="block text-sm font-medium text-gray-700 mb-2">Visible (in)</Label>
                                                    <TextInput 
                                                        id="mat_in_visible" 
                                                        onChange={handleChange} 
                                                        name="mat_in_visible" 
                                                        placeholder="e.g., 2.5" 
                                                        className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="mat_in_total" className="block text-sm font-medium text-gray-700 mb-2">Total (in)</Label>
                                                <TextInput 
                                                    id="mat_in_total" 
                                                    onChange={handleChange} 
                                                    name="mat_in_total" 
                                                    placeholder="e.g., 4" 
                                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showCanvasFloat && (
                                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Canvas Floater Options</h3>
                                        <div>
                                            <Label htmlFor="canvas_floater_inches" className="block text-sm font-medium text-gray-700 mb-2">Floater Depth (inches)</Label>
                                            <TextInput 
                                                id="canvas_floater_inches" 
                                                onChange={handleChange} 
                                                name="canvas_floater_inches" 
                                                placeholder="e.g., 1.5" 
                                                className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                )}

                                {(showFloat || showWindowMat || showCanvasFloat) && (
                                    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Options</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="glazing" className="block text-sm font-medium text-gray-700 mb-2">Glazing</Label>
                                                <Select 
                                                    id="glazing" 
                                                    name="glazing" 
                                                    onChange={handleChange}
                                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                >
                                                    <option value="">Select Glazing</option>
                                                    <option value="regular_glass">Regular Glass</option>
                                                    <option value="non_glare_glass">Non-Glare Glass</option>
                                                    <option value="museum_glass">Museum Glass</option>
                                                    <option value="plexiglass">Plexiglass</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="spacers" className="block text-sm font-medium text-gray-700 mb-2">Spacers</Label>
                                                <Select 
                                                    id="spacers" 
                                                    name="spacers" 
                                                    onChange={handleChange}
                                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                >
                                                    <option value="">Select Spacers</option>
                                                    <option value="none">None</option>
                                                    <option value="regular">Regular</option>
                                                    <option value="archival">Archival</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Step 3: Job Notes */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Step 3: Job Notes</h2>
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="art_location" className="block text-sm font-medium text-gray-700 mb-2">Artwork Location</Label>
                                <TextInput 
                                    onChange={handleChange} 
                                    name="art_location" 
                                    id="art_location" 
                                    placeholder="e.g., Main Gallery" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="art_condition" className="block text-sm font-medium text-gray-700 mb-2">Artwork Condition</Label>
                                <TextInput 
                                    onChange={handleChange} 
                                    name="art_condition" 
                                    id="art_condition" 
                                    placeholder="e.g., Excellent" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="final_location" className="block text-sm font-medium text-gray-700 mb-2">Final Location</Label>
                                <TextInput 
                                    onChange={handleChange} 
                                    name="final_location" 
                                    id="final_location" 
                                    placeholder="e.g., Client's Office" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="payment_type" className="block text-sm font-medium text-gray-700 mb-2">Payment Type</Label>
                                <TextInput 
                                    onChange={handleChange} 
                                    name="payment_type" 
                                    id="payment_type" 
                                    placeholder="e.g., Credit Card" 
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-between items-center">
                            <div className="flex items-center mb-4 mr-6">
                                <Checkbox 
                                    id="is_completed" 
                                    onChange={handleChange} 
                                    name="is_completed"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <Label htmlFor="is_completed" className="ml-2 text-gray-700">Completed</Label>
                            </div>
                            <div className="flex items-center mb-4 mr-6">
                                <Checkbox 
                                    id="client_notified" 
                                    onChange={handleChange} 
                                    name="client_notified"
                                    checked={form.client_notified}
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <Label htmlFor="client_notified" className="ml-2 text-gray-700">Client Notified</Label>
                            </div>
                            <div className="flex items-center mb-4 mr-6">
                                <Checkbox 
                                    id="deposit" 
                                    onChange={handleChange} 
                                    name="deposit"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <Label htmlFor="deposit" className="ml-2 text-gray-700">Deposit Received</Label>
                            </div>
                            <div className="flex items-center mb-4">
                                <Checkbox 
                                    id="balance_paid" 
                                    onChange={handleChange} 
                                    name="balance_paid"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <Label htmlFor="balance_paid" className="ml-2 text-gray-700">Balance Paid</Label>
                            </div>
                        </div>
                        {form.client_notified && (
                            <div className="mt-4">
                                <Label htmlFor="notification_date" className="block text-sm font-medium text-gray-700 mb-2">Notification Date</Label>
                                <Datepicker 
                                    onChange={handleChange} 
                                    name="notification_date" 
                                    datepicker-format="yyyy/MM/dd"
                                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit and Delete Buttons */}
                <div className="flex justify-between">
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                    >
                        Submit Frame
                    </button>
                    <button 
                        type="button" 
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
                    >
                        Delete Frame
                    </button>
                </div>
            </form>
        </div>
    </div>
);}


export default AddFrame;