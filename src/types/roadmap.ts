export type CourseStatus = 'Not Taken' | 'In Progress' | 'Completed' | 'Failed';

export interface Course {
    id: string;
    name: string;
    credits: number;
    status: CourseStatus;
    category: string;
    semester?: number; // For semester view
    grade?: string;
    gpa?: number | null;
}

export interface RoadmapCategory {
    name: string;
    courses: Course[];
    isCollapsed?: boolean;
}
