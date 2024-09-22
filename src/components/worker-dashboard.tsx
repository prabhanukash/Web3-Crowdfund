'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TagIcon, ClockIcon, CoinsIcon, ImageIcon } from "lucide-react"
import TaskView from "@/components/task-view"

interface TaskImage {
  id: number;
  url: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
  deadline: string;
  reward: string;
  images: TaskImage[];
}

const WorkerDashboard: React.FC = () => {
    const [viewingTask, setViewingTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const handleStartTask = (task: Task) => {
        setSelectedTask(task)
        setViewingTask(true)
    }

    const dummyTasks: Task[] = [
        {
            id: 1,
            title: "Rate Product Images",
            description: "Rate the quality and appeal of product images for an e-commerce site",
            tags: ["Image Rating", "E-commerce"],
            deadline: "3 days",
            reward: "0.1 SOL",
            images: [
                { id: 1, url: "https://picsum.photos/200/300" },
                { id: 2, url: "https://picsum.photos/200/300.jpg" },
                { id: 3, url: "https://picsum.photos/200/300" },
            ]
        },
        {
            id: 2,
            title: "Classify Nature Photos",
            description: "Classify nature photographs into categories like 'landscape', 'wildlife', 'plants', etc.",
            tags: ["Image Classification", "Nature"],
            deadline: "5 days",
            reward: "0.15 SOL",
            images: [
                { id: 4, url: "https://picsum.photos/200/300" },
                { id: 5, url: "https://picsum.photos/200/300" },
                { id: 6, url: "https://picsum.photos/200/300" },
            ]
        },
        // ... other tasks
    ]

    return (
        <div className="max-w-6xl mx-auto p-4">
            {viewingTask && selectedTask ? (
                <>
                    <Button onClick={() => setViewingTask(false)} className="mb-4">Back to Dashboard</Button>
                    <TaskView task={selectedTask} />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
                    <div className="mb-6">
                        <Input
                            className="w-full"
                            placeholder="Search tasks..."
                            type="search"
                        />
                    </div>
                    <Tabs defaultValue="available">
                        <TabsList>
                            <TabsTrigger value="available">Available Tasks</TabsTrigger>
                            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="available">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {dummyTasks.map((task) => (
                                    <Card key={task.id}>
                                        <CardHeader>
                                            <CardTitle>{task.title}</CardTitle>
                                            <CardDescription>{task.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="aspect-video mb-4 bg-gray-100 flex items-center justify-center">
                                                {task.images.length > 0 && task.images[0] ? (
                                                    <img src={task.images[0].url} alt={task.title} className="max-h-full max-w-full object-contain" />
                                                ) : (
                                                    <ImageIcon className="h-12 w-12 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                                <TagIcon className="h-4 w-4" />
                                                <span>{task.tags.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                                <ClockIcon className="h-4 w-4" />
                                                <span>Deadline: {task.deadline}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <CoinsIcon className="h-4 w-4" />
                                                <span>Reward: {task.reward}</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full" onClick={() => handleStartTask(task)}>Start Task</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="inprogress">
                            <p>Tasks in progress will be displayed here.</p>
                        </TabsContent>
                        <TabsContent value="completed">
                            <p>Completed tasks will be displayed here.</p>
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}

export default WorkerDashboard