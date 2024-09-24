import { useAddTemplateMutation } from "@/store/api/inboxApi";
import { ChannelType, TemplateBodyType } from "@/types";
import { useState } from "react";
type BuilderModalType = {
  close: () => void;
  channels?: ChannelType[];
};
export const TemplateBuilderModal = ({ close, channels }: BuilderModalType) => {
  const [formData, setFormData] = useState<TemplateBodyType>({
    bot_id: 0,
    name: "",
    triggersTo: "",
    text: "",
  });
  const [createTemplate, { isLoading }] = useAddTemplateMutation();

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

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTemplate({
        ...formData,
        name: new Date().getTime().toString(),
      });
    } catch (error) {
      console.error("Error adding template", error);
    } finally {
      close();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={close}
    >
      <form
        className="relative w-[90vw] md:w-[60vw] lg:w-[40vw] bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 transform transition-all duration-500 ease-in-out scale-100 hover:scale-[1.02]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={close}
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
            {channels?.map((channel) => (
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
  );
};
