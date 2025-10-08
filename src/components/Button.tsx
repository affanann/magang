export default function Button({
  label,
  onClick,
  type = "button",
}: {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#F59E0B] w-full py-3 rounded-lg text-white font-semibold hover:bg-[#d78909] transition"
    >
      {label}
    </button>
  );
}
