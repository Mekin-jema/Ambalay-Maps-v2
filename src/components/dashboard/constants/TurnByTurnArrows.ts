import ArrowRight from "../../../assets/images/right.svg";
import ArrowLeft from "../../../assets/images/left.svg";
import ArrowSlightLeft from "../../../assets/images/slight_left.svg";
import ArrowSlightRight from "../../../assets/images/slight_right.svg";
import ArrowStraight from "../../../assets/images/straight.svg";
import ArrowUturn from "../../../assets/images/uturn.svg";

// Define a type for the direction keys
type Direction = "right" | "left" | "slight right" | "slight left" | "straight" | "uturn";

// Create the DIRECTION_ARROWS object with the specified type for TypeScript
export const DIRECTION_ARROWS: Record<Direction, string> = {
  right: ArrowRight,
  left: ArrowLeft,
  "slight right": ArrowSlightRight,
  "slight left": ArrowSlightLeft,
  straight: ArrowStraight,
  uturn: ArrowUturn,
};
