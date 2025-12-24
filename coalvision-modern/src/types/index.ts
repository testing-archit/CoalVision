export interface User {
    name: string;
    enrollId: string;
    position: string;
    site: string;
    status: string;
    pass?: string;
}

export interface Alert {
    id: string;
    title: string;
    message: string;
    timestamp: string;
}

export interface Handover {
    id: string;
    shiftDate: string;
    supervisor: string;
    importantNotes: string;
    pendingTasks: string;
    safetyConcerns: string;
    equipmentStatus: string;
    createdAt: string;
}

export interface Holiday {
    date: string;
    reason: string;
}

export interface Update {
    id: string;
    title: string;
    content: string;
    date: string;
    workerCount?: number;
    safetyTraining?: string;
    production?: {
        total: string;
        increase: string;
    };
    environment?: {
        airQuality: string;
        waterUsage: string;
    };
    community?: {
        projects: string;
        workshops: string;
    };
}
