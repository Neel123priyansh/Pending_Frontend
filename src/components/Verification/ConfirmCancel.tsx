import sonner, { toast } from "react-toastify"
import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { setTime } from "react-datepicker/dist/date_utils"
import { Button } from "../ui/button"

interface Props{
  open: boolean;
  onClose: () => void;
}

export default function ConfirmCancel({open, onClose} : Props) {

    const navigate = useNavigate()
    if(!open) return null

    const confirm = () => {
        toast("Cancelled. Returning to Home...");
        onClose();
        setTimeout(() => navigate("/"), 800);
    };

    return(
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="text-sm text-gray-600 mt-2">
          You will be returned to Home.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-3 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            No
          </button>

          <button
            className="px-3 py-2 bg-red-600 text-white rounded-md"
            onClick={confirm}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
    )
}