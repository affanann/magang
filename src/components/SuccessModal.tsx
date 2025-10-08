export default function SuccessModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0F1A2A]/95 text-white rounded-2xl p-6 text-center max-w-xs mx-4">
        <div className="text-5xl mb-2">✅</div>
        <h2 className="text-xl font-bold mb-1">Berhasil</h2>
        <p className="text-sm text-gray-300 mb-4">Silakan kembali ke menu Login</p>
        <button
          onClick={onClose}
          className="bg-[#F59E0B] w-full py-2 rounded-lg font-medium hover:bg-[#d78909]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
