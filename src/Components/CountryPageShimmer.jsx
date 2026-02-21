import React from 'react'
import useStore from './ZustandState'
const CountryPageShimmer = () => {
  const Mode = useStore((store) => store.Mode);
  return (
    <div className="mt-12 flex flex-col lg:flex-row gap-12 lg:items-start">

      {/* LEFT IMAGE SHIMMER */}
      <div
        className={`
      relative w-full lg:w-1/2
      h-[320px] sm:h-[420px]
      rounded-xl overflow-hidden
      ${!Mode ? "bg-[#f3f3f3]" : "bg-[#111111]"}
    `}
      >
        <div
          className={`
        absolute inset-0 pointer-events-none
        bg-gradient-to-r
        from-transparent
        ${!Mode ? "via-white/60" : "via-white/10"}
        to-transparent
        animate-[shimmer_1.4s_linear_infinite]
      `}
        />
      </div>

      {/* RIGHT CONTENT SHIMMER */}
      <div className="w-full flex flex-col gap-8">

        {/* TITLE */}
        <div
          className={`
        relative h-8 w-1/2 rounded
        overflow-hidden
        ${!Mode ? "bg-[#e5e5e5]" : "bg-[#1f1f1f]"}
      `}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${!Mode ? "via-white/60" : "via-white/10"} to-transparent animate-[shimmer_1.4s_linear_infinite]`} />
        </div>

        {/* INFO GRID */}
        <div className="flex flex-col md:flex-row gap-12">

          {/* LEFT INFO */}
          <div className="flex flex-col gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`
              relative h-5 w-3/4 rounded overflow-hidden
              ${!Mode ? "bg-[#e5e5e5]" : "bg-[#1f1f1f]"}
            `}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${!Mode ? "via-white/60" : "via-white/10"} to-transparent animate-[shimmer_1.4s_linear_infinite]`} />
              </div>
            ))}
          </div>

          {/* RIGHT INFO */}
          <div className="flex flex-col gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`
              relative h-5 w-3/4 rounded overflow-hidden
              ${!Mode ? "bg-[#e5e5e5]" : "bg-[#1f1f1f]"}
            `}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${!Mode ? "via-white/60" : "via-white/10"} to-transparent animate-[shimmer_1.4s_linear_infinite]`} />
              </div>
            ))}
          </div>

        </div>

        {/* BORDER BUTTONS SHIMMER */}
        <div className="flex flex-wrap gap-3 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`
            relative h-9 w-20 rounded-md overflow-hidden
            ${!Mode ? "bg-[#e5e5e5]" : "bg-[#1f1f1f]"}
          `}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${!Mode ? "via-white/60" : "via-white/10"} to-transparent animate-[shimmer_1.4s_linear_infinite]`} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CountryPageShimmer