"use client";

import React, { memo, useCallback, useEffect } from "react";
import { useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { useToast } from "@chakra-ui/react";
import html2canvas from "html2canvas";

const bingoNames = [
  "瀑布",
  "搭档",
  "作画",
  "口罩+眼镜+帽子+耳机",
  "古代人",
  "谐音梗",
  "厉害折扣",
  "花束",
  "跑者",
  "落单耳机",
  "摆拍",
  "野猫对视",
  "",
  "球体",
  "一饮而尽",
  "好快的车",
  "电量告急",
  "排什么呢",
  "哼歌",
  "拍手",
  "基本一致",
  "燃起来了",
  "淋雨",
  "好招牌",
  "好高的老人",
];

const words = [
  "我的HAPPY HOUR 就是现在",
  "大风吹来了小猫",
  "狠狠当一回大人",
  "喜欢什么就一定要说出来",
  "以轻松愉快的心情面对就可以了",
  "谁是 NiCE TRY 最好笑的人",
  "装个可爱混过去",
  "来，对齐一下",
  "内容太空",
  "开心的时候听音乐，伤心的时候听歌词",
  "#nicetry展",
  "#nicetrybingo",
];

const Background = memo(() => {
  const [wordsList] = useState(words.sort(() => Math.random() - 0.5));

  return wordsList.map((word, index) => {
    const left =
      Math.random() > 0.5 ? Math.random() * 10 + 5 : Math.random() * -50 + 100;
    return (
      <a
        key={index}
        href="https://nicetrypod.com/"
        target="__blank"
        className={`absolute hidden right-0 text-4xl font-bold text-white -z-0 whitespace-nowrap opacity-40 hover:opacity-100 md:block cursor-[url("/try.png"),default] max-w-[max-content]`}
        style={{
          top: `${(index + 1) * 60}px`,
          left: `${left}%`,
        }}
      >
        {word}
      </a>
    );
  });
});

Background.displayName = "Background";

export default function Home() {
  const toast = useToast();
  const posterRef = React.useRef<HTMLDivElement>(null);
  const [bingoImages, setBingoImages] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // set base64 image to bingoImages
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result;
        if (typeof base64 === "string") {
          setBingoImages((prev) => {
            const next = [...prev];
            next[index] = base64;
            return next;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(() => {
    if (posterRef.current === null) {
      return;
    }
    toast({
      position: "bottom",
      title: "正在生成图片",
      status: "info",
      isClosable: false,
      duration: 2000000,
    });

    toPng(posterRef.current!, {
      canvasWidth: 2550,
      canvasHeight: 3300,
      cacheBust: true,
      quality: 1,
    }).then(function (dataUrl) {
      if (dataUrl.length > 100) {
        saveAs(dataUrl, "MYNiCETRYBINGO.png");
        toast.closeAll();
        toast({
          position: "bottom",
          title: "图片下载成功",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
      } else {
        html2canvas(posterRef.current!, {
          scale: 2,
        })
          .then(function (canvas) {
            document.body.appendChild(canvas);
            canvas.style.display = "none";
            const dataUrl = canvas.toDataURL("image/png", 1);
            document.body.removeChild(canvas);
            saveAs(dataUrl, "MYNiCETRYBINGO.png");
            toast.closeAll();
            toast({
              position: "bottom",
              title: "图片下载成功",
              status: "success",
              isClosable: true,
              duration: 2000,
            });
          })
          .catch((e) => {
            console.log(e);
            alert(e);
          });
      }
    });
  }, [toast]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative flex flex-col items-center min-h-screen p-4 pt-8 overflow-hidden">
      {isMounted && <Background />}
      <div
        ref={posterRef}
        className="relative flex flex-col items-center w-full max-w-[511px] aspect-[255/330] px-6 pt-5 bg-white bg-contain md:pt-7 md:px-8 z-100"
      >
        <h1
          className="relative font-extrabold text-center text-black md:text-xl whitespace-nowrap 
        after:content-['']
        after:block
        after:absolute
        after:left-1/2
        after:-bottom-1
        after:w-full
        after:h-[2px]
        after:bg-[#FA0101]
        after:rounded-[8px]
        after:translate-x-[-50%]
        "
        >
          NiCE TRY 都市散步 BINGO
        </h1>
        <div className="grid w-full grid-rows-5 grid-cols-5 gap-[9px] mt-4 md:mt-6">
          {bingoNames.map((bingo, index) => {
            const currentImage =
              bingoImages[index] ?? `/bingos/slice-${index + 1}.png`;
            const hasBingo = bingoImages[index];
            return (
              <label
                key={"bingo" + bingo}
                htmlFor={"bingo" + bingo}
                className="relative flex items-end justify-center cursor-pointer aspect-square hover:shadow-md"
              >
                <div className="absolute w-full h-full flex items-center justify-center overflow-hidden md:hidden">
                  <img
                    id={"bingo" + bingo + "image"}
                    src={currentImage}
                    alt={bingo}
                    className="w-full"
                  />
                </div>
                <img
                  id={"bingo" + bingo + "image"}
                  src={currentImage}
                  alt={bingo}
                  className="absolute w-full h-full object-cover"
                />

                <input
                  hidden
                  id={"bingo" + bingo}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />

                {hasBingo && (
                  <>
                    <div
                      className={`text-sm text-center font-medium pb-1 text-white whitespace-nowrap sm:text-base
                 ${
                   index === 3
                     ? "scale-50 md:scale-50"
                     : "scale-90 md:scale-100"
                 }
                 `}
                      style={{
                        textShadow: "0px 0px 2px #000000",
                      }}
                    >
                      {bingo}
                    </div>
                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full border-[#EF3323] border-[3px] opacity-90" />
                  </>
                )}
              </label>
            );
          })}
        </div>
        <div className="self-start text-black text-xs scale-50 -translate-x-[25%] whitespace-nowrap leading-5 md:text-base">
          <p>游玩方法：</p>
          <p>观察到 BINGO 卡上描述的情景时，可以在对应的格子上画圈。</p>
          <p>
            有五个格子连成一行（横向、纵向或斜向都可以）时，可以大喊BINGO，宣布获胜。
          </p>
          <p>严格一点当然好，大致上一样也可以。</p>
          <p>探索过程中拍下的照片或者视频，可以加上 #NiCETRYbingo 发布。</p>
        </div>
      </div>
      <div className="relative z-100 flex flex-col items-center text-xs mt-2 md:text-base">
        <div className="text-white text-center">
          <div>
            <p>点击对应图片上传，完成你的 #NiCE TRY BINGO！</p>
            <p>然后点击 BINGO 等待图片生成！</p>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            （因为是一个“以轻面”的网站，所以请尽可能使用电脑的 Chrome
            浏览器操作。）
          </div>
        </div>
        <button
          className="text-xl md:text-3xl text-[#EF3323] font-bold bg-white px-10 py-2 mt-4 active:scale-90 active:shadow-xl transition-all md:px-10 md:py-5"
          onClick={handleDownload}
        >
          BINGO!
        </button>
      </div>
    </main>
  );
}
