"use client";

import React, { useState } from "react";
import { useUser } from "@/hooks/useUser"; // assuming this hook is implemented
import axios from "axios";
import {
  useGetChannelsQuery,
  useGetTemplatesQuery,
} from "@/store/api/inboxApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Spinner } from "@/components/ui/spinner";

type ChannelType = {
  id: number;
  name: string;
  bot_id: number;
};

type TemplatesType = {
  id: number;
  bot_id: number;
  name: string;
  text: string;
  triggersTo: string;
  createdAt: string;
  updatedAt: string;
  bot_name: string;
};

type TemplateBodyType = {
  bot_id: number;
  name: string;
  triggersTo: string;
  text: string;
};

const Dashboard = () => {
  const user = useUser(); // assuming useUser provides user object
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TemplateBodyType>({
    bot_id: 0,
    name: "",
    triggersTo: "",
    text: "",
  });

  const channels = useGetChannelsQuery(user.id, { skip: !!!user.id });
  const templates = useGetTemplatesQuery(selectedChannel ?? skipToken);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bot_id = parseInt(e.target.value);
    setFormData({ ...formData, bot_id });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const builderOnClose = () => setIsBuilderOpen(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_BACKEND}/tg/addtemplate`,
        { ...formData, name: new Date().getTime() }
      );
      alert("Template added successfully!");
      setIsBuilderOpen(false);
    } catch (error) {
      console.error("Error adding template", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800">Automations</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.isLoading ? (
            <Spinner />
          ) : (
            <>
              {channels.data?.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`p-4 border rounded-lg shadow-lg cursor-pointer ${
                    selectedChannel === channel.id
                      ? "bg-indigo-200"
                      : "bg-white"
                  }`}
                >
                  <h2 className="text-xl font-bold text-gray-800">
                    {channel.name}
                  </h2>
                  <p className="text-gray-600">Bot ID: {channel.id}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Display templates if a channel is selected */}
        {selectedChannel && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Templates</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {templates.isLoading ? (
                <Spinner />
              ) : (
                <>
                  {templates.data?.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 bg-white border rounded-lg shadow-sm"
                    >
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <p>Trigger: {template.triggersTo}</p>
                      <p>Reply: {template.text}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Add Automation Button */}
        <button
          className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={() => setIsBuilderOpen(true)}
        >
          Add Automation
        </button>

        {/* Modal for adding new template */}
        {isBuilderOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={builderOnClose}
          >
            <form
              className="relative w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 transform transition-all duration-500 ease-in-out scale-100 hover:scale-[1.02]"
              onClick={(e) => e.stopPropagation()}
              onSubmit={onSubmitHandler}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={builderOnClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Select a channel
                </label>
                <select
                  onChange={handleSelectChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="0">Choose a channel</option>
                  {channels.data?.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Message equals to
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  name="triggersTo"
                  onChange={onInputChange}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Reply with
                </label>
                <textarea
                  className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  name="text"
                  onChange={onInputChange}
                />
              </div>

              <button
                className="w-full bg-indigo-500 text-white py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-transform duration-300 hover:scale-105"
                type="submit"
              >
                Submit
              </button>
              {isLoading && <p>Loading...</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
