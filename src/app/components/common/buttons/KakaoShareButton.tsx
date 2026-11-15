'use client';

import Image from "next/image";
import { getCourseDifficulty } from "@/app/lib/constants/difficulty";
import { setTimeNumber2KoreanTimeFormat } from "@/app/lib/utils";

interface CourseDetailKakaoSharedButtonProps {
  courseCode: string;
  imageUrl: string;
  courseName: string;
  description: string;
  courseLevel: number;
  runningTime: number; // 분단위
  distance: number; // km 단위
  isReturn: boolean;
}


export function CourseDetailKakaoShareButton(params: CourseDetailKakaoSharedButtonProps) {
  const difficulty = getCourseDifficulty(params.courseLevel);
  const runningTimeString = setTimeNumber2KoreanTimeFormat(params.runningTime);


  const handler = () => {
    if(!window.Kakao?.isInitialized()) {
      alert("카카오 공유를 준비 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    
    window.Kakao.Share.sendCustom({
      templateId: 138987,
      templateArgs: {
        introduce: params.description,
        difficulty: difficulty.label,
        runningTime: runningTimeString,
        distance: String(Math.floor(params.distance * 10) / 10),
        title: params.courseName,
        mainImage: params.imageUrl,
        courseStyle: params.isReturn ? "왕복" : "편도",
        code: params.courseCode,
      }
    });
  }




  return (
      <Image
        onClick={handler}
        src="/buttons/kakaotalk_sharing_btn_small.svg"
        alt="카카오 공유 버튼"
        width={34}
        height={35}
        style={{
          "cursor": "pointer"
        }}
        loading="eager"
      />
  );
}
