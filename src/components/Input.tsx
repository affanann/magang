export default function Input({
  type = "text",
  placeholder,
}: {
  type?: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm mb-3 focus:border-[#F59E0B] outline-none"
    />
  );
}
