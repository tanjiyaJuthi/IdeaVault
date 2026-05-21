'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#5a0627] via-[#43041d] to-black flex items-center justify-center px-5 lg:px-0">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-lg mb-6">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-3">
            Something went wrong
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Unexpected Error
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            An unexpected issue occurred while processing your request. Try refreshing the page or go back to continue browsing.
          </p>

          {error?.message && (
            <div className="mt-6 w-full rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-left">
              <p className="text-sm text-red-200 break-words">
                {error.message}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#5a0627] px-6 py-3 font-semibold transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
