import { capitalize } from '../../utils/stringUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface TagsBadgeProps {
  tags: { name: string; color: string }[]
  onAddTagClick?: () => void
}

const TagsBadge = ({ tags, onAddTagClick }: TagsBadgeProps) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return (
      <button
        onClick={onAddTagClick}
        className="flex items-center gap-2 px-2 py-1 text-sm border border-gray-300 rounded-full hover:bg-violet-200 active:opacity-60 transition-colors font-inter text-[13px] leading-5 text-[#868686]"
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
        <span>Add Tag</span>
      </button>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#09090B14] py-[5px] px-[10px] overflow-hidden max-w-full max-h-[30px]">
      <div className="flex gap-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-xs"
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </div>
      <span className="font-inter font-semibold text-[13px] leading-5 text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {tags.length === 1 ? capitalize(tags[0].name) : `${tags.length} Tags`}
      </span>
    </div>
  )
}

export default TagsBadge

