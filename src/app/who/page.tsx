"use client";

import React, { useCallback, useState } from "react";
import Typical from "react-typical";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import {
  Button,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { HexColorPicker } from "react-colorful";
import Image from "next/image";

export default function Who() {
  const toast = useToast();
  const posterRef = React.useRef<HTMLDivElement>(null);

  const [fontSize, setFontSize] = useState(50);
  const [color, setColor] = useState("#8A336C");

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
      canvasWidth: posterRef.current.clientWidth,
      canvasHeight: posterRef.current.clientHeight,
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

  return (
    <main className="flex justify-center items-start min-h-screen py-20 md:pt-40">
      <div>
        {/* <h1 className="text-3xl font-bold mb-8">你是一个怎么样的人:</h1> */}
        <div className="text-3xl font-bold mb-8">
          <Typical
            steps={["你", 500, "你是一个怎么样的人:", 1000]}
            loop={1}
            wrapper="h1"
          />
        </div>
        <div className="flex justify-start flex-col md:flex-row">
          <div>
            <div
              ref={posterRef}
              className=" bg-white w-[300px] font-extrabold rounded-lg px-8 py-3 font-sans"
              style={{
                color,
              }}
            >
              <h2 className="text-6xl">HELLO</h2>
              <h3 className="leading-7 text-4xl ">I&apos;M</h3>
              <div
                className={`font-[qiuhong] text-black mt-2 tracking-widest`}
                contentEditable
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                播客布林
              </div>
            </div>
            <div className="mt-4">修改上面的文字，输入你的答案</div>
          </div>
          <div className="flex flex-col justify-start  md:ml-10 mt-4 md:mt-0">
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="!w-full min-w-[200px] !h-[150px] md:!h-[200px]"
            />
            <label className="mb-1 mt-4">字体大小</label>
            <Slider min={24} max={64} value={fontSize} onChange={setFontSize}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize="6" className="round-full overflow-hidden">
                <Image src="/nice.webp" layout="fill" alt="nice" />
              </SliderThumb>
            </Slider>
            <Button
              className="mt-4"
              style={{
                backgroundColor: color,
              }}
              onClick={handleDownload}
            >
              NiCE TRY
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
