import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TagIcon, ClockIcon, CoinsIcon, ImageIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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

interface TaskViewProps {
  task: Task;
}

const TaskView: React.FC<TaskViewProps> = ({ task }) => {
  const [ratings, setRatings] = useState<{ [key: number]: string }>({})
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleRating = (imageId: number, rating: string) => {
    setRatings(prev => ({ ...prev, [imageId]: rating }))
  }

  const handleSubmit = () => {
    if (Object.keys(ratings).length === task.images.length) {
      console.log(`Submitted ratings for task ${task.id}:`, ratings)
      // Here you would typically send this data to your backend
    } else {
      alert("Please rate all images before submitting.")
    }
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % task.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + task.images.length) % task.images.length)
  }

  const currentImage = task.images[currentImageIndex]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {currentImage ? (
              <img src={currentImage.url} alt={`Image ${currentImageIndex + 1}`} className="max-h-full max-w-full object-contain" />
            ) : (
              <ImageIcon className="h-12 w-12 text-gray-400" />
            )}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {currentImageIndex + 1} / {task.images.length}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2" 
              onClick={prevImage}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2" 
              onClick={nextImage}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <TagIcon className="h-4 w-4" />
          <span>{task.tags.join(', ')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <ClockIcon className="h-4 w-4" />
          <span>Deadline: {task.deadline}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <CoinsIcon className="h-4 w-4" />
          <span>Reward: {task.reward}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Rate this image:</h3>
          <RadioGroup 
            onValueChange={(value) => currentImage && handleRating(currentImage.id, value)} 
            value={currentImage ? ratings[currentImage.id] || undefined : undefined}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value.toString()} id={`r${value}`} />
                <Label htmlFor={`r${value}`}>{value} - {value === 1 ? 'Poor' : value === 2 ? 'Fair' : value === 3 ? 'Average' : value === 4 ? 'Good' : 'Excellent'}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Submit All Ratings</Button>
      </CardFooter>
    </Card>
  )
}

export default TaskView