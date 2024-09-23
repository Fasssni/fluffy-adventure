"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import {
  useAddTemplateMutation,
  useGetChannelsQuery,
  useGetTemplatesQuery,
} from "@/store/api/inboxApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Spinner } from "@/components/ui/spinner";
import { TemplateBuilderModal } from "@/components/template-builder-modal";

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
  const user = useUser();
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const channels = useGetChannelsQuery(user.id, { skip: !!!user.id });
  const templates = useGetTemplatesQuery(selectedChannel ?? skipToken);

  const builderOnClose = () => setIsBuilderOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 pl-[56px]">
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
        <button
          className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          onClick={() => setIsBuilderOpen(true)}
        >
          Add Automation
        </button>
        {isBuilderOpen && (
          <TemplateBuilderModal
            close={builderOnClose}
            channels={channels.data}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
