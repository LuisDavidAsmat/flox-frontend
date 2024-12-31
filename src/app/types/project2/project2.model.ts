export interface Project2
{
    id?: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    completionPercentage: number;
    creator: User2;
    tasks: Task2[];
    members: User2[];
}

export interface Task2
{
    id?: number;
    title: string;
    description: string;
    taskStatus: string;
    dueDate: string;

    projectId?: number;
    projectName?: string;
    assigneeId?: number;
    assigneeName?: string;
    
}

export interface User2
{
    userId: number;
    username: string;
    email: string;
    userRole: string;
}
