import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HelpCircle, SquareChevronRight, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

export function Home() {
  const questions = [
    {
      question: "Mais de 50% da População Angolana é:",
      correct: "A",
      options: [
        { label: "A", text: "Cristã" },
        { label: "B", text: "Protestante" },
        { label: "C", text: "Muçulmana" },
        { label: "D", text: "Ateísta" },
      ],
    },
    {
      question: "Qual é a capital de Angola?",
      correct: "C",
      options: [
        { label: "A", text: "Benguela" },
        { label: "B", text: "Lubango" },
        { label: "C", text: "Luanda" },
        { label: "D", text: "Huambo" },
      ],
    },
    {
      question: "Qual o nome do criador desse jogo",
      correct: "D",
      options: [
        { label: "A", text: "Gabriel M. Cavala" },
        { label: "B", text: "Manuel Cavala" },
        { label: "C", text: "Gabriel Manuel" },
        { label: "D", text: "Gabriel Cavala Manuel" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
const [timeOver, setTimeOver] = useState(false);

  const [score, setScore] = useState(0);

  const current = questions[currentIndex];

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

useEffect(() => {
  if (selected || timeOver) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev === 1) {
        clearInterval(timer);
        setTimeOver(true);
        playSound("/sounds/alarm-clock-short-6402.mp3"); // você pode adicionar esse som
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [selected, timeOver]);


  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-PT"; // ou "pt-BR" se preferir
    window.speechSynthesis.speak(utterance);
  };

 const handleAnswer = (option: string) => {
  if (selected) return;

  setSelected(option);
  playSound("/sounds/digital-click-357350.mp3"); // som ao clicar

  if (option === current.correct) {
    setScore((prev) => prev + 1);
    speak("Resposta certa!");
  } else {
    playSound("/sounds/error-126627.mp3");  // som de erro
    speak("Resposta errada!");
  }
};


const nextQuestion = () => {
  setSelected(null);
  setTimeLeft(10);
  setTimeOver(false);
  setCurrentIndex((prev) => prev + 1);
};


  return (
    <motion.div
      className="flex h-screen"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="lg:flex lg:flex-col lg:flex-1 lg:ml-40 lg:p-4 flex flex-col flex-1 -ml-16 mt-9 p-4">
        <div className="flex flex-col p-4 ml-4">
          {/* HEADER */}
          <header className="flex flex-col">
            <div className="flex items-center gap-1">
              <Avatar className="bg-yellow-400 border-5">
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-none gap-0 p-0 m-0">
                <strong className="text-white text-sm">Gabriel Manuel</strong>
                <strong className="text-white text-sm">{score}.00 pts</strong>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="pt-3 flex justify-between">
                <span className="text-white font-bold">
                  {currentIndex + 1}º Fase
                </span>
                <div className="flex items-center">
           <span className="text-white font-bold">{timeLeft}s</span>
                  <Timer size={14} color="white" />
                </div>
              </div>
              <div className="w-full rounded bg-white h-4"></div>
            </div>
          </header>

          {/* PERGUNTA */}
          {currentIndex < questions.length ? (
            <>
              <div className="flex flex-col gap-3">
                <div className="pt-5 ml-2">
                  <Card className="w-80 h-28 border-[4px] border-yellow-500 rounded-xl shadow-md">
                    <CardContent className="flex items-center justify-center h-full text-center">
                      <span className="font-bold text-sm">{current.question}</span>
                    </CardContent>
                  </Card>
                </div>

                {/* RESPOSTAS */}
                <div className="flex flex-col gap-2">
                  {current.options.map((opt) => {
                    const isCorrect = selected && opt.label === current.correct;
                    const isWrong = selected === opt.label && opt.label !== current.correct;

                    return (
                      <div key={opt.label} className="flex gap-1">
                        <div className="shadow-md bg-gradient-to-r w-14 rounded-sm flex items-center justify-center from-yellow-400 via-yellow-500 to-yellow-600">
                          <span className="text-3xl text-red-600 font-bold">{opt.label}</span>
                        </div>
                        <Card
                          className={`
                            flex flex-1 cursor-pointer transition 
                            ${isCorrect ? "bg-green-400 border-green-600 text-white" : ""}
                            ${isWrong ? "bg-red-400 border-red-500 text-white" : ""}
                          `}
                      onClick={() => {
  if (!selected && !timeOver) handleAnswer(opt.label);
}}
                        >
                          <CardContent className="flex justify-center items-center w-full h-16">
                            <span className="font-semibold">{opt.text}</span>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}

                  {/* Botões */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="shadow-md bg-gradient-to-r w-20 h-8 p-5 rounded-sm flex items-center justify-center from-yellow-400 via-yellow-500 to-yellow-600">
                      <HelpCircle size={27} className="text-red-700" />
                    </div>
                    <button
                      onClick={nextQuestion}
                      disabled={!selected}
                      className="shadow-md bg-gradient-to-r w-20 h-8 p-5 rounded-sm flex items-center justify-center from-yellow-400 via-yellow-500 to-yellow-600 disabled:opacity-50"
                    >
                      <SquareChevronRight size={27} className="text-red-700" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-20 text-white text-xl font-bold">
              Fim do Quiz! <br />
              Pontuação final: {score} / {questions.length}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
