import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL ||
    'postgresql://neondb_owner:npg_5W2SgnaePqJi@ep-summer-heart-a18x6eh5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    enroll_id: string;
    position: string;
    site: string;
    status: string;
    role: string;
}

export interface Alert {
    id: number;
    title: string;
    message: string;
    priority: string;
    created_at: string;
    dismissed: boolean;
}

export interface Handover {
    id: number;
    user_id: number;
    shift_date: string;
    supervisor: string;
    important_notes: string;
    pending_tasks: string;
    safety_concerns: string;
    equipment_status: string;
    created_at: string;
}

export interface Holiday {
    id: number;
    date: string;
    reason: string;
    holiday_type: string;
}

// Auth functions
export async function loginUser(name: string, password: string): Promise<User | null> {
    try {
        const result = await sql`
      SELECT id, name, email, phone, enroll_id, position, site, status, role 
      FROM users 
      WHERE name = ${name} AND password = ${password}
    `;
        return result.length > 0 ? result[0] as User : null;
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}

// Alert functions
export async function getAlerts(): Promise<Alert[]> {
    try {
        const result = await sql`
      SELECT id, title, message, priority, created_at, dismissed 
      FROM alerts 
      WHERE dismissed = false 
      ORDER BY created_at DESC
    `;
        return result as Alert[];
    } catch (error) {
        console.error('Get alerts error:', error);
        return [];
    }
}

export async function dismissAlert(alertId: number): Promise<boolean> {
    try {
        await sql`UPDATE alerts SET dismissed = true WHERE id = ${alertId}`;
        return true;
    } catch (error) {
        console.error('Dismiss alert error:', error);
        return false;
    }
}

// Handover functions
export async function getHandovers(userId?: number): Promise<Handover[]> {
    try {
        if (userId) {
            const result = await sql`
        SELECT * FROM handovers 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC 
        LIMIT 10
      `;
            return result as Handover[];
        }
        const result = await sql`
      SELECT * FROM handovers 
      ORDER BY created_at DESC 
      LIMIT 10
    `;
        return result as Handover[];
    } catch (error) {
        console.error('Get handovers error:', error);
        return [];
    }
}

export async function createHandover(handover: Omit<Handover, 'id' | 'created_at'>): Promise<Handover | null> {
    try {
        const result = await sql`
      INSERT INTO handovers (user_id, shift_date, supervisor, important_notes, pending_tasks, safety_concerns, equipment_status)
      VALUES (${handover.user_id}, ${handover.shift_date}, ${handover.supervisor}, ${handover.important_notes}, ${handover.pending_tasks}, ${handover.safety_concerns}, ${handover.equipment_status})
      RETURNING *
    `;
        return result[0] as Handover;
    } catch (error) {
        console.error('Create handover error:', error);
        return null;
    }
}

// Holiday functions
export async function getHolidays(): Promise<Holiday[]> {
    try {
        const result = await sql`
      SELECT id, date, reason, holiday_type 
      FROM holidays 
      ORDER BY date ASC
    `;
        return result as Holiday[];
    } catch (error) {
        console.error('Get holidays error:', error);
        return [];
    }
}

// Updates functions
export async function getUpdates() {
    try {
        const result = await sql`
      SELECT * FROM updates 
      ORDER BY created_at DESC 
      LIMIT 10
    `;
        return result;
    } catch (error) {
        console.error('Get updates error:', error);
        return [];
    }
}

export default sql;
