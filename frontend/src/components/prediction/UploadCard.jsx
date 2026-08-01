import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { UploadCloud, Image as ImageIcon } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'

export default function UploadCard({ onSelect }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted?.[0]) onSelect(accepted[0])
    },
    [onSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    multiple: false,
  })

  return (
    <GlassCard className="p-2">
      <div
        {...getRootProps()}
        className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer px-8 py-16 flex flex-col items-center justify-center text-center gap-4 ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-white/15 hover:border-primary/40'
        }`}
      >
        <input {...getInputProps()} aria-label="Upload an image of a cat or dog" />

        <motion.div
          animate={isDragActive ? { scale: 1.1 } : { scale: 1, y: [0, -6, 0] }}
          transition={
            isDragActive
              ? { duration: 0.2 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-16 h-16 rounded-2xl bg-aurora grid place-items-center shadow-glow"
        >
          {isDragActive ? (
            <ImageIcon className="w-7 h-7 text-white" />
          ) : (
            <UploadCloud className="w-7 h-7 text-white" />
          )}
        </motion.div>

        <div>
          <p className="font-semibold text-text">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image'}
          </p>
          <p className="text-sm text-muted mt-1">or click to browse — PNG, JPG, WEBP</p>
        </div>
      </div>
    </GlassCard>
  )
}
