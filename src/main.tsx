
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/routes/AppRoutes'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
    <>
    <App />
    <Toaster />
    </>,
)
