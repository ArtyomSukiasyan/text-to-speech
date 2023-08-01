import { useState, useEffect, ChangeEvent } from "react";
import Voices from "./components/Voices";
import "./App.css";

function TextToSpeechApp() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("Google US English");
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    const fetchVoices = () => {
      const synth = window.speechSynthesis;

      synth.addEventListener("voiceschanged", () => {
        const voices = synth.getVoices();
        setVoices(voices);
      });
    };

    fetchVoices();
  }, []);

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(e.target.value);
  };

  const handleSpeechTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSpeechText(e.target.value);
  };

  const handleSpeakButtonClick = () => {
    if (speechText !== "") {
      const synth = window.speechSynthesis;

      if (!synth.speaking) {
        const utterance = new SpeechSynthesisUtterance(speechText);

        const selectedVoiceObj = voices.find(
          (voice) => voice.name === selectedVoice
        );

        if (selectedVoiceObj) {
          utterance.voice = selectedVoiceObj;
        }

        synth.speak(utterance);
      } else {
        synth.pause();
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Text To Speech</h1>
      <div className="form">
        <div className="row">
          <label>Enter Text</label>
          <textarea
            value={speechText}
            onChange={handleSpeechTextChange}
          ></textarea>
        </div>
        <Voices
          voices={voices}
          selectedVoice={selectedVoice}
          onChange={handleVoiceChange}
        />
        <button onClick={handleSpeakButtonClick}>Convert To Speech</button>
      </div>
    </div>
  );
}

export default TextToSpeechApp;
