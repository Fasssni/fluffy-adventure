"use client";
import { useUser } from "@/hooks/useUser";
import { useCreateTgBotMutation } from "@/store/api/inboxApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";

type BotProps = {
  name: string;
  id: number;
};

type ModalProps = {
  name?: string;
  handleModalClose: () => void;
};

export const TelegramAdder = () => {
  const [token, setToken] = useState<Record<string, string>>({
    token: "",
    greeting: "",
  });
  const [botData, setBotData] = useState<BotProps>();
  const [modalOk, setModalOk] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const tokenRef = useRef<HTMLInputElement>(null);

  const { id } = useUser();
  const [createBot, { isLoading }] = useCreateTgBotMutation();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token.token.length > 43) {
      const { data } = await createBot({
        user_id: id,
        token: token.token,
        greeting: token.greeting,
      });
      setToken({ token: "", greeting: "" });
      setBotData(data);
      setModalOk(true);
    } else {
      setErrorMessage("The token doesn't seem to be valid :(");
    }
  };

  const handleModalClose = () => {
    setModalOk(false);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      {modalOk && (
        <ModalOk name={botData?.name} handleModalClose={handleModalClose} />
      )}

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Connect your <span className="text-blue-500">Telegram</span>
        </h3>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Bot token"
            value={token.token}
            ref={tokenRef}
            onChange={(e) =>
              setToken((state) => ({ ...state, token: e.target.value }))
            }
          />
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Greeting (optional)"
            value={token.greeting}
            onChange={(e) =>
              setToken((state) => ({ ...state, greeting: e.target.value }))
            }
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
          >
            Connect
          </button>

          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            To set this up, do the following:
          </h3>
          <ol className="list-decimal pl-6 space-y-2 mt-3 text-gray-700 dark:text-gray-300">
            <li>
              Go to{" "}
              <a
                href="https://telegram.me/botfather"
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noreferrer"
              >
                this link
              </a>
            </li>
            <li>
              Create your bot and paste the token{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => tokenRef.current?.focus()}
              >
                here
              </span>
            </li>
            <li>Click "Connect" and start using it!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const ModalOk = ({ name, handleModalClose }: ModalProps) => {
  const router = useRouter();

  const handleNav = () => {
    router.push("/inbox");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleModalClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold text-center">
          The bot <span className="text-blue-500">@{name}</span> has
          successfully been added.
        </p>
        <p className="mt-4 text-center">
          It's now ready to receive messages at the{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={handleNav}
          >
            Inbox
          </a>
        </p>
      </div>
    </div>
  );
};
