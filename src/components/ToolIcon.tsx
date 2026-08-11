import React from 'react'
import { 
  FileText, 
  MessageSquare, 
  Search, 
  Calculator, 
  Megaphone, 
  PenTool, 
  Mail, 
  Sparkles, 
  Image as ImageIcon, 
  Code, 
  Terminal, 
  Wrench,
  Video,
  LucideProps
} from 'lucide-react'

interface ToolIconProps extends LucideProps {
  name: string
}

export default function ToolIcon({ name, ...props }: ToolIconProps) {
  switch (name) {
    case 'FileText':
      return <FileText {...props} />
    case 'MessageSquare':
      return <MessageSquare {...props} />
    case 'Search':
      return <Search {...props} />
    case 'Calculator':
      return <Calculator {...props} />
    case 'Megaphone':
      return <Megaphone {...props} />
    case 'PenTool':
      return <PenTool {...props} />
    case 'Mail':
      return <Mail {...props} />
    case 'Sparkles':
      return <Sparkles {...props} />
    case 'Image':
      return <ImageIcon {...props} />
    case 'Code':
      return <Code {...props} />
    case 'Terminal':
      return <Terminal {...props} />
    case 'Wrench':
      return <Wrench {...props} />
    case 'Youtube':
    case 'Video':
      return <Video {...props} />
    default:
      return <Wrench {...props} />
  }
}
