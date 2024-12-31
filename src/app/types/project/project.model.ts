export interface Project 
{
    id?: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    completionPercentage: number;
    creatorId?: number;
    creatorName?: string;
    creator: 
    {
        userId: number;
        username: string;
        // email: string, 
        // userRole: string 
    };
    tasks: Task[];
    members: User[];
}

export interface Task
{
    title: string;
    description: string;
    taskStatus: string;
    dueDate: string;
    assignee: User;
}

export interface User 
{
    userId: number;
}
