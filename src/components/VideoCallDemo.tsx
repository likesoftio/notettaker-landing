import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  MoreVertical,
  Download,
  Share,
  Info,
  Mic,
  MicOff,
} from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
  waveform: number[];
  isMuted: boolean;
}

const VideoCallDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(3592); // 59:52 в секундах
  const [activeSpeaker, setActiveSpeaker] = useState("A");

  const speakers: Speaker[] = [
    {
      id: "A",
      name: "Анна Петрова",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&blur=8",
      isActive: true,
      waveform: [
        0.1, 0.3, 0.7, 0.2, 0.8, 0.4, 0.9, 0.1, 0.6, 0.3, 0.7, 0.2, 0.5, 0.8,
        0.3, 0.9, 0.1, 0.4, 0.6, 0.2,
      ],
      isMuted: false,
    },
    {
      id: "B",
      name: "Михаил Соколов",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&blur=8",
      isActive: false,
      waveform: [
        0.2, 0.8, 0.3, 0.9, 0.1, 0.7, 0.4, 0.6, 0.2, 0.8, 0.3, 0.5, 0.9, 0.1,
        0.7, 0.4, 0.6, 0.2, 0.8, 0.3,
      ],
      isMuted: false,
    },
    {
      id: "C",
      name: "Елена Козлова",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&blur=8",
      isActive: false,
      waveform: [
        0.4, 0.2, 0.9, 0.1, 0.6, 0.8, 0.3, 0.7, 0.2, 0.9, 0.1, 0.5, 0.8, 0.4,
        0.6, 0.2, 0.9, 0.1, 0.7, 0.3,
      ],
      isMuted: false,
    },
    {
      id: "D",
      name: "Дмитрий Волков",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&blur=8",
      isActive: false,
      waveform: [
        0.1, 0.5, 0.2, 0.8, 0.4, 0.9, 0.1, 0.6, 0.3, 0.7, 0.2, 0.8, 0.4, 0.9,
        0.1, 0.5, 0.6, 0.3, 0.7, 0.2,
      ],
      isMuted: true,
    },
    {
      id: "E",
      name: "Ольга Смирнова",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop&crop=face&blur=8",
      isActive: false,
      waveform: [
        0.3, 0.1, 0.8, 0.4, 0.2, 0.9, 0.6, 0.1, 0.7, 0.3, 0.8, 0.2, 0.9, 0.4,
        0.1, 0.6, 0.3, 0.7, 0.2, 0.8,
      ],
      isMuted: false,
    },
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % duration);
        // Симуляция смены активного спикера
        if (Math.random() > 0.95) {
          const randomSpeaker =
            speakers[Math.floor(Math.random() * speakers.length)];
          setActiveSpeaker(randomSpeaker.id);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, speakers]);

  const WaveForm: React.FC<{ data: number[]; isActive: boolean }> = ({
    data,
    isActive,
  }) => (
    <div className="flex items-center gap-[1px] h-8">
      {data.map((height, index) => (
        <div
          key={index}
          className={`w-1 rounded-full transition-all duration-300 ${
            isActive ? "bg-blue-500 animate-pulse" : "bg-gray-300"
          }`}
          style={{
            height: `${Math.max(height * 100, 10)}%`,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );

  const mainSpeakers = speakers.slice(0, 3);
  const remainingSpeakers = speakers.slice(3);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Демонстрация видеозвонка
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Info className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Видеоинтерфейс */}
        <div className="bg-black rounded-xl p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {mainSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className={`relative aspect-video rounded-lg overflow-hidden ${
                  activeSpeaker === speaker.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <button className="p-1 bg-black bg-opacity-50 rounded">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {speaker.name.split(" ")[0]}
                  </span>
                </div>
                {speaker.isMuted && (
                  <div className="absolute bottom-2 right-2">
                    <MicOff className="w-4 h-4 text-red-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Остальные участники как аватары */}
          <div className="flex justify-center gap-2">
            {remainingSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                  activeSpeaker === speaker.id
                    ? "border-blue-500"
                    : "border-gray-600"
                }`}
              >
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Контролы плеера */}
          <div className="flex items-center justify-between mt-4 text-white">
            <button
              onClick={togglePlayPause}
              className="flex items-center gap-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </button>

            <div className="flex items-center gap-4">
              <button className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
              <button className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
              <button className="hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Прогресс-бар */}
          <div className="mt-2 bg-gray-700 h-1 rounded-full">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Список спикеров с аудиоволнами */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Спикеры ({speakers.length})
            <button className="text-blue-600 hover:text-blue-700">
              <Plus className="w-5 h-5" />
            </button>
          </h3>

          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                activeSpeaker === speaker.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-colors ${
                  activeSpeaker === speaker.id ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                {isPlaying && activeSpeaker === speaker.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {speaker.id}
                  </span>
                  <div className="flex items-center gap-2">
                    {speaker.isMuted && (
                      <MicOff className="w-4 h-4 text-red-500" />
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <WaveForm
                  data={speaker.waveform}
                  isActive={activeSpeaker === speaker.id && isPlaying}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            Информация о записи
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Длительность:</span>{" "}
              {formatTime(duration)}
            </div>
            <div>
              <span className="font-medium">Участники:</span> {speakers.length}
            </div>
            <div>
              <span className="font-medium">Качество:</span> HD
            </div>
            <div>
              <span className="font-medium">Статус:</span> Обработано
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Импорт Plus иконки
const Plus: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export default VideoCallDemo;
