import Commercial from "../assets/commercial.webp"
import Italian from "../assets/Italian.jpeg"
import Roof from "../assets/rooftop.webp"
import Homeoven from "../assets/homeoven.jpeg"

export interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  description: string;
  category: string;
  completedDate: string;
  client: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Grand Italian Restaurant Setup",
    location: "Mumbai, Maharashtra",
    image: Italian,
    description: "Complete wood-fired oven installation for a premium Italian restaurant with custom design and professional training.",
    category: "Restaurant Installation",
    completedDate: "March 2024",
    client: "Italiano Classico",
    features: ["Custom stone finish", "Professional training included", "2-year warranty", "Monthly maintenance"]
  },
  {
    id: 2,
    title: "Hotel Chain Pizza Station",
    location: "Delhi, NCR",
    image: Commercial,
    description: "Large-scale commercial gas oven installation for hotel chain's 24/7 pizza station with high-volume capacity.",
    category: "Hotel Installation",
    completedDate: "February 2024",
    client: "Premium Hotels Ltd",
    features: ["24/7 operation capability", "Energy efficient design", "Quick heat-up time", "Remote monitoring"]
  },
  {
    id: 3,
    title: "Rooftop Restaurant Project",
    location: "Bangalore, Karnataka",
    image: Roof,
    description: "Weather-resistant hybrid oven for rooftop dining with panoramic city views and authentic cooking experience.",
    category: "Rooftop Installation",
    completedDate: "January 2024",
    client: "Sky Dine Restaurant",
    features: ["Weather protection", "Hybrid fuel system", "Panoramic installation", "Custom ventilation"]
  },
  {
    id: 4,
    title: "Home Chef's Dream Kitchen",
    location: "Pune, Maharashtra",
    image: Homeoven,
    description: "Luxury home installation with compact design perfectly integrated into modern kitchen aesthetics.",
    category: "Residential Installation",
    completedDate: "December 2023",
    client: "Private Residence",
    features: ["Space-saving design", "Modern integration", "Easy maintenance", "Family-friendly operation"]
  },
  {
    id: 5,
    title: "Food Court Central Kitchen",
    location: "Hyderabad, Telangana",
    image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Multiple oven setup for food court's central kitchen serving various pizza outlets with consistent quality.",
    category: "Commercial Setup",
    completedDate: "November 2023",
    client: "Metro Food Court",
    features: ["Multiple oven system", "Centralized operation", "Quality consistency", "High-volume capacity"]
  }
];