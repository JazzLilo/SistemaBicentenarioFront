import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from 'lucide-react'

const colorVariants = {
  sky: 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
  amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  rose: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'
}

const iconBgColors = {
  sky: 'bg-sky-100 dark:bg-sky-800/50 text-sky-600 dark:text-sky-400',
  emerald: 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-400',
  purple: 'bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-400',
  rose: 'bg-rose-100 dark:bg-rose-800/50 text-rose-600 dark:text-rose-400'
}

export const SummaryCard = ({ title, value, change, trend, icon, color = 'sky' }) => {
  return (
    <Card className={`border ${colorVariants[color]} shadow-sm hover:shadow-md transition-shadow duration-300 group`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${iconBgColors[color]} transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
       
      </CardContent>
    </Card>
  )
}