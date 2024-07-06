import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ModalVideo from 'react-modal-video';
import { FaPlay } from "react-icons/fa";

export const VideoModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ModalVideo
				channel="youtube"
				youtube={{ mute: 0, autoplay: 0 }}
				isOpen={isOpen}
				videoId="6kMHntEae5Y"
				onClose={() => setOpen(false)} 
			/>
      <button className="flex flex-row gap-2 items-center justify-center bg-white border-[#9FD8CB]/30 border-2 px-2 py-2 rounded-xl w-40 font-bold text-zinc-900" onClick={() => setOpen(true)}>
        <FaPlay className="text-[#9FD8CB]"/>
        Conhecer
      </button>
    </React.Fragment>
  );
};