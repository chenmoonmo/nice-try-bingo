"use client";

import React from "react";
import { useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export default function Home() {
  const posterRef = React.useRef<HTMLDivElement>(null);
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

  const [bingoImages, setBingoImages] = useState<string[]>([]);

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

  const handleDownload = () => {
    toPng(posterRef.current!, {
      width: 511,
      height: 661,
    }).then(function (dataUrl) {
      if (dataUrl) {
        console.log(dataUrl);
        saveAs(dataUrl, "MYNiCETRYBINGO.png");
      }
    });
  };

  return (
    <main className="flex flex-col items-center mt-4">
      <div
        ref={posterRef}
        className="w-[511px] h-[661px] aspect-[255/330] p-[30px] pt-[83px] bg-[url('/bingo.jpeg')] bg-contain"
      >
        <div className="grid grid-rows-[repeat(5,83px)] grid-cols-[repeat(5,83px)] gap-[9px]">
          {bingoNames.map((bingo, index) => {
            const currentImage = bingoImages[index];
            return (
              <label
                key={"bingo" + bingo}
                htmlFor={"bingo" + bingo}
                className="relative flex items-end justify-center cursor-pointer bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${bingoImages[index]})`,
                  backgroundColor: currentImage ? "#FFF" : "transparent",
                }}
              >
                <input
                  hidden
                  id={"bingo" + bingo}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />

                {currentImage && (
                  <>
                    <div
                      className={`text-center font-medium pb-1 mix-blend-difference text-white whitespace-nowrap
                 ${index === 3 ? "scale-50" : ""}
                 `}
                    >
                      {bingo}
                    </div>
                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full border-[#EF3323] border-[3px] opacity-70" />
                  </>
                )}
              </label>
            );
          })}
        </div>
      </div>
      <div className="text-white mt-1">点击对应图片上传，完成你的 #NiCE TRY BINGO！</div>
      <button
        className="text-3xl text-[#EF3323] font-bold bg-white px-10 py-5 mt-4"
        onClick={handleDownload}
      >
        BINGO!
      </button>
    </main>
  );
}
