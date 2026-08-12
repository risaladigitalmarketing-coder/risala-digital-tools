'use client'

import React, { useState, useEffect } from 'react'
import { MessageSquare, Send, User, Sparkles, ThumbsUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabase'

interface CommentItem {
  id: string
  userName: string
  userImage?: string
  text: string
  createdAt: string
  likes: number
}

interface ToolCommentsProps {
  toolSlug: string
}

export default function ToolComments({ toolSlug }: ToolCommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<CommentItem[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    async function fetchComments() {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('tool_comments')
          .select('*')
          .eq('tool_slug', toolSlug)
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setComments(data.map(item => ({
            id: item.id,
            userName: item.user_name,
            userImage: item.user_image,
            text: item.text,
            createdAt: new Date(item.created_at).toLocaleDateString(),
            likes: item.likes || 0
          })))
          return
        }
      }

      // LocalStorage Fallback
      if (typeof window !== 'undefined') {
        const storageKey = `comments_${toolSlug}`
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          try {
            setComments(JSON.parse(saved))
          } catch (e) {
            console.error('Error parsing comments:', e)
          }
        } else {
          const sampleComments: CommentItem[] = [
            {
              id: 'c1',
              userName: 'Rahul Sharma',
              text: 'Super helpful utility tool! Saved me a lot of time.',
              createdAt: '2 hours ago',
              likes: 4
            },
            {
              id: 'c2',
              userName: 'Priya Patel',
              text: 'Works cleanly client-side. Really fast processing!',
              createdAt: 'Yesterday',
              likes: 7
            }
          ]
          setComments(sampleComments)
          localStorage.setItem(storageKey, JSON.stringify(sampleComments))
        }
      }
    }

    fetchComments()
  }, [toolSlug])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const authorName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Guest Marketer'
    const authorImage = session?.user?.image || undefined
    const commentText = newComment.trim()

    const commentObj: CommentItem = {
      id: 'comment-' + Date.now(),
      userName: authorName,
      userImage: authorImage,
      text: commentText,
      createdAt: 'Just now',
      likes: 0
    }

    const updated = [commentObj, ...comments]
    setComments(updated)
    setNewComment('')

    // Save to LocalStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`comments_${toolSlug}`, JSON.stringify(updated))
    }

    // Save to Supabase Cloud
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.from('tool_comments').insert([
        {
          tool_slug: toolSlug,
          user_name: authorName,
          user_image: authorImage,
          text: commentText,
          likes: 0
        }
      ])
    }
  }

  const handleLike = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c)
    setComments(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`comments_${toolSlug}`, JSON.stringify(updated))
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 mt-8 shadow-xs">
      <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center space-x-2">
        <MessageSquare size={20} className="text-green-600" />
        <span>Community Feedback & Ratings</span>
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-8">
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0 mt-1">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <User size={18} />
            )}
          </div>
          <div className="flex-1 relative">
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={session?.user ? "Share feedback or report an issue..." : "Leave a comment as Guest..."}
              className="w-full p-3.5 pr-14 rounded-2xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition resize-none"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-xs disabled:opacity-40 hover:scale-105 transition"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
              {comment.userImage ? (
                <img src={comment.userImage} alt={comment.userName} className="w-full h-full rounded-lg object-cover" />
              ) : (
                comment.userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900">{comment.userName}</h4>
                <span className="text-[10px] font-semibold text-slate-400">{comment.createdAt}</span>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">{comment.text}</p>

              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-[11px] font-bold text-slate-500 hover:text-green-600 transition"
                >
                  <ThumbsUp size={12} />
                  <span>{comment.likes > 0 ? comment.likes : 'Helpful'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
