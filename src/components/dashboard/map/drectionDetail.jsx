import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import maplibregl from "maplibre-gl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DIRECTION_ARROWS } from "../constants/TurnByTurnArrows";
import { Volume2, MousePointerClick } from "lucide-react"; // optional icons if using lucide-react

const RenderDirectionDetail = ({ map, route }) => {
  const { waypoints } = useSelector((state) => state.map);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const populateVoiceList = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }

    populateVoiceList();
  }, []);

  const speakText = (text) => {
    const synth = window.speechSynthesis;

    if (synth.speaking) synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.voice =
      voices.find((voice) => voice.lang === "en-US") || voices[0];
    synth.speak(utterThis);
  };

  const steps = route?.legs[0]?.steps || [];

  const handleStepClick = (step) => {
    if (!map) return;

    map.flyTo({
      center: step.maneuver.location,
      essential: true,
      zoom: 15,
    });

    new maplibregl.Marker({ color: "blue" })
      .setLngLat(step.maneuver.location)
      .addTo(map);

    new maplibregl.Popup({ closeButton: false, className: "custom-popup" })
      .setLngLat(step.maneuver.location)
      .setHTML(`<div class="popup-content"><strong>Active Segment</strong><br/>${step.name}</div>`)
      .setOffset([0, -30])
      .addTo(map);

    speakText(
      `Proceed ${step.distance} meters, then turn ${step.maneuver.modifier} onto ${step.name}.`
    );
  };

  const handleSoundClick = (step) => {
    speakText(
      `Proceed ${step.distance} meters, then turn ${step.maneuver.modifier} onto ${step.name}.`
    );
  };

  return (
    <Card className="z-20 flex flex-col shadow-lg rounded-2xl w-full bg-white dark:bg-[#16413B]">
      <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl font-bold">Via Africa Venue</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
          <span>{((route?.duration || 0) / 60).toFixed(2)} min</span> (
          {((route?.distance || 0) / 1000).toFixed(2)} km)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {steps.map((step, idx) => {
              if (!step || step.maneuver?.location?.length < 2) return null;

              const isWaypoint = waypoints.some(
                (wp) =>
                  wp.latitude === step.maneuver.location[1] &&
                  wp.longitude === step.maneuver.location[0]
              );

              return (
                <div
                  key={idx}
                  className={`py-3 px-4 flex justify-between items-start hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                    isWaypoint ? "bg-blue-50 dark:bg-blue-900" : ""
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={DIRECTION_ARROWS[step.maneuver.modifier]}
                      alt="Step icon"
                      className="w-5 h-5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {step.name || "Unnamed Road"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {step.distance} meters
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSoundClick(step);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                    title="Play direction audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RenderDirectionDetail;
