export interface DifficultyInfo {
  code: string;
  level: number;
  label: string;
  color: string;
  content: string;
};


export type CourseDifficultyLabel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const COURSE_DIFFICULTIES: Record<CourseDifficultyLabel, DifficultyInfo>  = {
  0: {code: 'UNKNOWN', level: 0, label: '알 수 없음', color: 'var(--course-difficulty-0)', content: ''  },
  1: {code: 'EASY', level: 1, label: '입문', color: 'var(--course-difficulty-1)', content: '' },
  2: {code: 'BEGINNER', level: 2, label: '쉬움', color: 'var(--course-difficulty-2)', content: '' },
  3: {code: 'INTERMEDIATE', level: 3, label: '보통', color: 'var(--course-difficulty-3)', content: '' },
  4: {code: 'ADVANCED', level: 4, label: '약간 어려움', color: 'var(--course-difficulty-4)', content: '' },
  5: {code: 'HARD', level: 5, label: '어려움', color: 'var(--course-difficulty-5)', content: '' },
  6: {code: 'CHALLENGER', level: 6, label: '매우어려움', color: 'var(--course-difficulty-6)', content: '' },
  7: {code: 'SEMI-EXPERT', level: 7, label: '산악사고주의', color: 'var(--course-difficulty-7)', content: '' },
}

export type SegmentDifficultyLabel = 0 | 1 | 2 | 3 | 4;
export const SEGMENT_DIFFICULTIES: Record<SegmentDifficultyLabel, DifficultyInfo> = {
  0: {code: 'UNKNOWN', level: 0, label: '알 수 없음', color: 'var(--segment-difficulty-0)', content: ''  },
  1: {code: 'EASY', level: 1, label: '쉬움', color: 'var(--segment-difficulty-1)', content: '' },
  2: {code: 'NORMAL', level: 2, label: '보통', color: 'var(--segment-difficulty-2)', content: '' },
  3: {code: 'HARD', level: 3, label: '어려움', color: 'var(--segment-difficulty-3)', content: '' },
  4: {code: 'VERH-HARD', level: 4, label: '매우어려움', color: 'var(--segment-difficulty-4)', content: '' },
}

function isCourseDifficultyLabel(level: number): level is CourseDifficultyLabel { // bool 타입으로 리턴하되 level을 CourseDifficultyLabel로 바꾸게 한다.
  return level in COURSE_DIFFICULTIES;
}

export function getCourseDifficulty(level: number): DifficultyInfo {
  return COURSE_DIFFICULTIES[isCourseDifficultyLabel(level) ? level : 0];
}

function isSegmentDifficultyLabel(level: number): level is SegmentDifficultyLabel {
  return level in SEGMENT_DIFFICULTIES;
}

export function getSegemntDifficulty(level: number): DifficultyInfo {
  return SEGMENT_DIFFICULTIES[isSegmentDifficultyLabel(level) ? level : 0];
}

export function changeDifficultyColorCss2Hex(info: DifficultyInfo): string {
  const variableName = info.color.slice(4, -1).trim();

  // CSS 변수에 지정된 실제 색상 값
  const rgbColor = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
  
  return rgbColor;
}
