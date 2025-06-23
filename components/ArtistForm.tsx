"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  bio: yup.string().required("Bio is required").min(50, "Bio must be at least 50 characters"),
  categories: yup.array().min(1, "Please select at least one category"),
  languages: yup.array().min(1, "Please select at least one language"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
})

interface FormData {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  feeRange: string
  location: string
  profileImage?: FileList
}

const categories = ["singers", "dancers", "speakers", "djs"]
const languages = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Malayalam",
  "Kannada",
]
const feeRanges = ["₹50,000-1,00,000", "₹1,00,000-2,50,000", "₹2,50,000-5,00,000", "₹5,00,000-10,00,000", "₹10,00,000+"]

export default function ArtistForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[]
    if (checked) {
      newCategories = [...selectedCategories, category]
    } else {
      newCategories = selectedCategories.filter((c) => c !== category)
    }
    setSelectedCategories(newCategories)
    setValue("categories", newCategories)
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    let newLanguages: string[]
    if (checked) {
      newLanguages = [...selectedLanguages, language]
    } else {
      newLanguages = selectedLanguages.filter((l) => l !== language)
    }
    setSelectedLanguages(newLanguages)
    setValue("languages", newLanguages)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)
      alert("Application submitted successfully!")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Artist Onboarding</CardTitle>
        <p className="text-center text-gray-600">
          Join our platform and start getting booked for amazing events across India
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us about yourself, your experience, and what makes you unique..."
              rows={4}
              className={errors.bio ? "border-red-500" : ""}
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
          </div>

          {/* Categories */}
          <div>
            <Label>Categories * (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
          </div>

          {/* Languages */}
          <div>
            <Label>Languages Spoken * (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={language}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                  />
                  <Label htmlFor={language}>{language}</Label>
                </div>
              ))}
            </div>
            {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>}
          </div>

          {/* Fee Range */}
          <div>
            <Label htmlFor="feeRange">Fee Range *</Label>
            <Select onValueChange={(value) => setValue("feeRange", value)}>
              <SelectTrigger className={errors.feeRange ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your fee range" />
              </SelectTrigger>
              <SelectContent>
                {feeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.feeRange && <p className="text-red-500 text-sm mt-1">{errors.feeRange.message}</p>}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="City, State (e.g., Mumbai, Maharashtra)"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <Label htmlFor="profileImage">Profile Image (Optional)</Label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="profileImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      {...register("profileImage")}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
