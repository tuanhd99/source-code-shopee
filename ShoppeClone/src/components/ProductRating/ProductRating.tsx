import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductRating({
  rating,
  activeClassname = "#ffa727",
  nonActiveClassname = "#d5d5d5"
}: {
  rating: number;
  activeClassname?: string;
  nonActiveClassname?: string;
}) {
  const handleWidth = (order: number) => {
    if (order <= rating) {
      return "100%";
    }
    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + "%";
    }
    return "0%";
  };
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative' key={index}>
              <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
                <FontAwesomeIcon icon={faStar} style={{ color: activeClassname }} />
              </div>
              <FontAwesomeIcon icon={faStar} color={nonActiveClassname} />
            </div>
          );
        })}
    </div>
  );
}

export default ProductRating;

// rating = 34
// 1 <= 3/4 => 100%
// 2 <= 3.4 => 100%
// 3 <= 3.4 => 100%
// 4 > 3.4 => 40% (4 -3.4 <1)
// 5 > 3.4 => 0% (5-3.4 >1)
