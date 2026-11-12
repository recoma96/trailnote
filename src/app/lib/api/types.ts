export interface CourseImage {
  url: string;
  width: number;
  height: number;
  summary: string;
}

export interface CourseDescription {
  title: string;
  content: string;
}

export interface CourseCoordinates {
  lat: number;
  lng: number;
}

export interface CourseTrackPoint extends CourseCoordinates {
  ele: number;
}

export interface CourseWaypoint extends CourseTrackPoint {
  name: string;
}

export interface CourseSegment {
  title: string;
  distance: number;
  runningTime: number;
  difficultyLevel: number;
  content: string;
  images: CourseImage[];
  startPoint: CourseWaypoint;
  endPoint: CourseWaypoint;
  trackPoints: CourseTrackPoint[];
}

export interface CourseLocation extends CourseCoordinates {
  name: string;
  content: string;
  type: string;
  images: CourseImage[];
}


export interface GetCourseResponse {
  title: string;
  address: string;
  isReturn: boolean;
  courseLevel: number;
  mainPictures: CourseImage[];
  runningTime: number;
  courseDescriptions: CourseDescription[];
  courseDifficultyDescriptions: string[];
  notes: CourseDescription[];
  segments: CourseSegment[];
  locations: CourseLocation[];
}
