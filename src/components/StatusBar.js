export default function StatusBar({ dark = false }) {
  return (
    <div className={`flex justify-between items-center px-6 pt-3 pb-1 flex-shrink-0 ${dark ? 'bg-[#1C1C1A]' : 'bg-cream'}`}>
      <span className={`text-[13px] font-medium ${dark ? 'text-[#F7F5F0]' : 'text-carbon'}`}>9:41</span>
      <div className="flex gap-1">
        {[0.4, 0.65, 1].map((op, i) => (
          <div key={i} className={`w-3.5 h-2 rounded-sm ${dark ? 'bg-[#F7F5F0]' : 'bg-carbon'}`} style={{ opacity: op }} />
        ))}
      </div>
    </div>
  )
}
