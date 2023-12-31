"use client";

import React, { memo, useCallback, useState } from "react";
import Typical from "react-typical";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import {
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
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
import "./page.css";

const Text = memo(() => {
  return (
    <Typical
      steps={["你", 500, "你是一个怎么样的人:", 1000]}
      loop={1}
      wrapper="h1"
    />
  );
});

Text.displayName = "Text";

export default function Who() {
  const toast = useToast();
  const posterRef = React.useRef<HTMLDivElement>(null);

  const [fontSize, setFontSize] = useState(50);
  const [fontFamily, setFontFamily] = useState<string>("qiuhong");
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
      canvasWidth: posterRef.current.clientWidth * 2,
      canvasHeight: posterRef.current.clientHeight * 2,
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
        <div className="text-3xl font-bold mb-8">
          <Text />
        </div>
        <div className="flex justify-start flex-col md:flex-row">
          <div>
            <div ref={posterRef} className="bg-gray-100 p-4">
              <div
                className=" bg-white w-[300px] font-extrabold rounded-lg px-4 py-3 font-sans shadow-xl"
                style={{
                  color,
                }}
              >
                <h2 className="text-6xl">HELLO</h2>
                <h3 className="leading-7 text-4xl">I&apos;M</h3>
                <Editable
                  defaultValue="播客布林"
                  className={`font-[qiuhong] text-black mt-2 tracking-widest`}
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: `${fontFamily}`,
                    lineHeight: `${fontSize}px`,
                  }}
                >
                  <EditablePreview w="full" minH="20px" />
                  <EditableTextarea />
                </Editable>
              </div>
            </div>

            <div className="mt-4">修改上面的文字，输入你的答案</div>
            <div className="mt-2 text-xs text-gray-300">
              <div>如果有的字打不出来请切换字体，Useful Idito 只支持英文。</div>
              <div>请尽可能使用电脑的 Chrome 浏览器操作。</div>
            </div>
          </div>
          <div className="flex flex-col justify-start  md:ml-10 mt-4 md:mt-0">
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="!w-full min-w-[200px] !h-[150px] md:!h-[200px]"
            />
            <label className="mb-1 mt-4">字体</label>
            <Select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="qiuhong">播客布林的样子</option>
              <option value="experiment">Useful Idito 的样子</option>
              <option value="ZCOOL KuaiLe">ZCOOL KuaiLe</option>
              <option value="sans-serif">sans-serif</option>
            </Select>
            <label className="mb-1 mt-4">字体大小</label>
            <Slider min={24} max={64} value={fontSize} onChange={setFontSize}>
              <SliderTrack bg="red.100">
                <SliderFilledTrack bg="#EA3622" />
              </SliderTrack>
              <SliderThumb boxSize="6" className="round-full overflow-hidden">
                <Image src="/nice.webp" layout="fill" alt="nice" />
              </SliderThumb>
            </Slider>
            <Button
              className="mt-4"
              style={{
                backgroundColor: color,
                color: "#fff",
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
