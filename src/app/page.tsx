"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

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

export default function Home() {
  const posterRef = React.useRef<HTMLDivElement>(null);
  const [bingoImages, setBingoImages] = useState<string[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  const wordsList = words.sort(() => Math.random() - 0.5);

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
    toPng(posterRef.current!).then(function (dataUrl) {
      if (dataUrl) {
        console.log(dataUrl);
        saveAs(dataUrl, "MYNiCETRYBINGO.png");
      }
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative flex flex-col items-center min-h-screen p-4 pt-8 overflow-hidden">
      {isMounted &&
        wordsList.map((word, index) => {
          const left =
            Math.random() > 0.5
              ? Math.random() * 10 + 5
              : Math.random() * -50 + 100;
          return (
            <a
              key={index}
              href="https://nicetrypod.com/"
              target="__blank"
              className={`absolute hidden right-0 text-4xl font-bold text-white -z-0 whitespace-nowrap opacity-60 hover:opacity-100 md:block cursor-[url("/try.png"),default]`}
              style={{
                top: `${(index + 1) * 60}px`,
                left: `${left}%`,
                animationDelay: Math.random() * 2 + "s",
              }}
            >
              {word}
            </a>
          );
        })}
      <div
        ref={posterRef}
        className="relative w-full max-w-[511px] aspect-[255/330] px-8 pt-5 bg-white bg-contain md:pt-7 z-100"
      >
        <h1 className="font-extrabold text-center underline decoration-[#FA0101] underline-offset-8 indent-6 md:text-xl">
          NiCE TRY 都市散步 BINGO
        </h1>
        <div className="grid grid-rows-5 grid-cols-5 gap-[9px] mt-4 md:mt-6">
          {bingoNames.map((bingo, index) => {
            const currentImage =
              bingoImages[index] ?? `"/bingos/Slice ${index + 1}.png"`;
            const hasBingo = bingoImages[index];

            return (
              <label
                key={"bingo" + bingo}
                htmlFor={"bingo" + bingo}
                className="relative flex items-end justify-center cursor-pointer bg-cover bg-center bg-no-repeat aspect-square"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundColor: hasBingo ? "#FFF" : "transparent",
                }}
              >
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
                      className={`text-xs text-center font-medium pb-1 mix-blend-difference text-white whitespace-nowrap md:text-base
                 ${
                   index === 3
                     ? "scale-50 md:scale-50"
                     : "scale-90 md:scale-100"
                 }
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
        <div className="text-xs scale-50 -translate-x-[25%] whitespace-nowrap leading-5 md:text-base">
          <p>游玩方法：</p>
          <p>观察到 BINGO 卡上描述的情景时，可以在对应的格子上画圈。</p>
          <p>
            有五个格子连成一行（横向、纵向或斜向都可以）时，可以大喊BINGO，宣布获胜。
          </p>
          <p>严格一点当然好，大致上一样也可以。</p>
          <p>探索过程中拍下的照片或者视频，可以加上 #NiCETRYbingo 发布。</p>
        </div>
      </div>
      <div className="text-white mt-1 text-center">
        <div>点击对应图片上传，完成你的 #NiCE TRY BINGO！</div>
        <div className="text-sm text-gray-300">
          （因为是一个“以轻面”的网站，所以请尽可能使用电脑的 Chrome
          浏览器操作。）
        </div>
      </div>
      <button
        className="text-3xl text-[#EF3323] font-bold bg-white px-10 py-5 mt-4 active:scale-90 active:shadow-xl transition-all"
        onClick={handleDownload}
      >
        BINGO!
      </button>
    </main>
  );
}
