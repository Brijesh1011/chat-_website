import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full relative overflow-hidden">
            <img
              src={
                selectedUser.profilePic ||
                "https://www.pngfind.com/pngs/m/34-349693_circled-user-icon-transparent-background-username-icon-hd.png"
              }
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-gray-800">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
