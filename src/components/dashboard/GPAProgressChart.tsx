'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface SemesterData {
    term: string;
    semesterGpa: number;
    cumulativeGpa: number;
}

interface GPAProgressChartProps {
    data: {
        education: {
            semesters: SemesterData[];
        };
    };
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                <p className="text-slate-900 font-bold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-slate-600 text-sm font-medium">{entry.name}:</span>
                        <span className="text-slate-900 text-sm font-bold">{entry.value.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function GPAProgressChart({ data }: GPAProgressChartProps) {
    const chartData = data?.education?.semesters || [];

    // Calculate dynamic min to make fluctuations more visible, but keep max at 4.0 for motivation
    const allGpas = chartData.flatMap(s => [s.semesterGpa, s.cumulativeGpa]);
    const minGpa = Math.floor(Math.min(...allGpas) * 10) / 10 - 0.2;
    const finalMin = Math.max(0, minGpa);
    const finalMax = 4.0; // Always keep the goal visible

    // Generate ticks that increment by 0.25
    const generateTicks = () => {
        const ticks = [];
        // Round finalMin down to nearest 0.25
        const startTick = Math.floor(finalMin * 4) / 4;
        // Generate ticks from startTick to finalMax in 0.25 increments
        for (let i = startTick; i <= finalMax; i += 0.25) {
            ticks.push(Math.round(i * 100) / 100); // Round to avoid floating point errors
        }
        return ticks;
    };

    return (
        <div className="w-full h-full min-h-[400px] p-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="colorSemester" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FFFFFF" opacity={0.1} />
                    <XAxis
                        dataKey="term"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#FFFFFF', opacity: 0.8, fontSize: 12, fontWeight: 600 }}
                        dy={10}
                    />
                    <YAxis
                        domain={[finalMin, finalMax]}
                        allowDecimals={true}
                        ticks={generateTicks()}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#FFFFFF', opacity: 0.8, fontSize: 10, fontWeight: 600 }}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="top"
                        height={40}
                        iconType="circle"
                        formatter={(value) => (
                            <span className="text-white/90 font-bold text-sm ml-1 mr-4">{value}</span>
                        )}
                    />
                    <Line
                        name="Semester GPA"
                        type="monotone"
                        dataKey="semesterGpa"
                        stroke="#3B82F6"
                        strokeWidth={4}
                        dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />
                    <Line
                        name="Cumulative GPA"
                        type="monotone"
                        dataKey="cumulativeGpa"
                        stroke="#10B981"
                        strokeWidth={4}
                        dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
