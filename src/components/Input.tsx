import { ChangeEvent } from "react";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 bg-[#E7F0FB] px-4 py-3 text-sm mb-3 focus:border-[#F59E0B] outline-none"
    />
  );
}
