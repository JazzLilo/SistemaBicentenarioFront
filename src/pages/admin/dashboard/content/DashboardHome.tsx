import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SummaryCard } from "./SummaryCard"
import { ActivityTable } from "@/components/activity-table"
import { Users, Newspaper, Calendar} from 'lucide-react'
import { apiService } from "@/services/apiService"
import { User } from "@/components/interface"

export const DashboardHome = () => {

  const [countUsers, setCountUsers] = useState(0)

  const summaryData = [
    { 
      title: 'Usuarios', 
      value: countUsers, 
      change: '+12%', 
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: "sky" as "sky"
    },
    { 
      title: 'Noticias', 
      value: '56', 
      change: '+5%', 
      trend: 'up',
      icon: <Newspaper className="h-5 w-5" />,
      color: "emerald" as "emerald"
    },
    { 
      title: 'Eventos', 
      value: '34', 
      change: '+8%', 
      trend: 'up',
      icon: <Calendar className="h-5 w-5" />,
      color: "amber" as "amber"
    }
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    
      await apiService.get('users/?skip=0&limit=100').then((response) => {
        const users = response.data as User[];
      console.log(users);
      setCountUsers(users.length); 
      }).catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  
  return (
    <div className=" bg-slate-900 rounded-xl shadow-xl container mx-auto px-4 py-6">
     
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 dark:text-white">Panel de Control</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Resumen de la actividad y métricas recientes</p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

        <div className="lg:col-span-2 space-y-6">
          
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-emerald-800 dark:text-emerald-400">
                Actividad reciente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ActivityTable />
            </CardContent>
          </Card>
        

        
      </div>
    </div>
  )
}