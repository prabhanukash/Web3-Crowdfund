'use client'
import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, UploadIcon, XIcon } from "lucide-react"
import { format } from "date-fns"

interface UploadedImage {
  file: File;
  preview: string;
}

const UserDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: UploadedImage[] = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
      setUploadedImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Task Title
          </label>
          <Input id="title" placeholder="Enter task title" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <Textarea id="description" placeholder="Describe your task" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="deadline">
            Deadline
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="images">
            Upload Images
          </label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-1 text-sm text-gray-600">
              Click to upload images or drag and drop
            </p>
            <Input 
              id="images" 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.preview} alt={`Uploaded ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tags">
            Categories
          </label>
          <Input id="tags" placeholder="Add categories (comma separated)" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="reward">
            Reward Amount (SOL)
          </label>
          <Input id="reward" type="number" step="0.001" placeholder="0.000" />
        </div>
        <Button type="submit" className="w-full">
          Create Task
        </Button>
      </form>
    </div>
  )
}

export default UserDashboard