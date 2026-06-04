import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles, Star, Zap, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ParchessProducts from './ParchessProducts'

export default function page() {
  return (
    <div className="top-padding ">
      <ParchessProducts />
    </div>
  )
}