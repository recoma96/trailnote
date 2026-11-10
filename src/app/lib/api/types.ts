export interface CourseImage {
  url: string;
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
  tracks: CourseTrackPoint[];
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
  courseLevel: number;
  mainPictures: CourseImage[];
  runningTime: number;
  courseDescriptions: CourseDescription[];
  courseDifficultyDescriptions: string[];
  note: CourseDescription[];
  segments: CourseSegment[];
  locations: CourseLocation[];
}
