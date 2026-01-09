const SkeletonRow = () => {
  return (
    <>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="flex justify-center">
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      </td>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
      </td>
      <td className="py-[22px] px-[16px] max-h-[64px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-[6px] animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-[6px] animate-pulse"></div>
        </div>
      </td>
    </>
  )
}

export default SkeletonRow

