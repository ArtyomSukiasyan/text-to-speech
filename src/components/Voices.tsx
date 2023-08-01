import { ChangeEvent } from "react";

interface IVoicesProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Voices({
  voices,
  selectedVoice,
  onChange,
}: IVoicesProps) {
  return (
    <div className="row">
      <label>Select Voice</label>
      <div className="outer">
        <select value={selectedVoice} onChange={onChange}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
